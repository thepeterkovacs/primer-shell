"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"

import React, { ReactNode, useState } from "react"

import { trpcClient } from "@/lib/utils/trpc/client"

export default function QueryProvider({ children }: { children: ReactNode }): JSX.Element {
	const [queryClient] = useState(() => new QueryClient({}))

	const [client] = useState(() =>
		trpcClient.createClient({
			links: [
				httpBatchLink({
					url: `${process.env.NEXT_PUBLIC_URL}/api/trpc`,
				}),
			],
		})
	)

	return (
		<trpcClient.Provider client={client} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</trpcClient.Provider>
	)
}
