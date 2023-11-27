import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { NextRequest } from "next/server"

import { rootRouter } from "api/root"
import { context } from "api/trpc"

import { isDevEnv } from "utils/standard"

const handler = (req: NextRequest) =>
	fetchRequestHandler({
		createContext: () => context({ req }),
		endpoint: "/api/trpc",
		onError: isDevEnv()
			? ({ path, error }) => {
					console.error(`tRPC error on ${path ?? "unknown"} path: ${error.message}`)
			  }
			: undefined,
		req,
		router: rootRouter,
	})

export { handler as GET, handler as POST }
