"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { loggerLink, unstable_httpBatchStreamLink } from "@trpc/client"
import { PropsWithChildren, useState } from "react"
import superjson from "superjson"

import trpcClient from "_trpc/client"

import { getTrpcUrl, isDevEnv } from "utils/standard"

interface Props extends PropsWithChildren {
	headers: Headers
}

export default function QueryProvider({ children, headers }: Props): JSX.Element {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnMount: false,
						refetchOnReconnect: false,
						refetchOnWindowFocus: false,
						retry: false,
					},
				},
			}),
	)

	const [client] = useState(() =>
		trpcClient.createClient({
			transformer: superjson,
			links: [
				loggerLink({
					enabled: (opts) =>
						(isDevEnv() && typeof window !== "undefined") ||
						(opts.direction === "down" && opts.result instanceof Error),
				}),
				unstable_httpBatchStreamLink({
					url: getTrpcUrl(),
					fetch(url, options) {
						return fetch(url, {
							...options,
							credentials: "include",
						})
					},
					headers() {
						const requestHeaders = new Map(headers)
						requestHeaders.set("x-trpc-source", "client")
						return Object.fromEntries(requestHeaders)
					},
				}),
			],
		}),
	)

	return (
		<trpcClient.Provider client={client} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</trpcClient.Provider>
	)
}
