import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { NextRequest } from "next/server"

import { rootRouter } from "api/root"
import { context } from "api/trpc"

import { log } from "utils/standard"

const handler = (req: NextRequest) =>
	fetchRequestHandler({
		createContext: () => context(),
		endpoint: "/api/trpc",
		onError: ({ path, error }) => {
			log(`tRPC error on ${`"${path}"` ?? "unknown"} path: ${error.message}`, "red")
		},
		req,
		router: rootRouter,
	})

export { handler as GET, handler as POST }
