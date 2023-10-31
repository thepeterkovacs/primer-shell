import { appRouter } from "@/server/api/appRouter"
import { httpBatchLink } from "@trpc/client"

export const trpcServer = appRouter.createCaller({
	links: [
		httpBatchLink({
			url: `${process.env.NEXT_PUBLIC_URL}/api/trpc`,
		}),
	],
})
