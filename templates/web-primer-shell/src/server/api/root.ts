import { router } from "api/trpc"

/**
 * Root application router holding all subrouters in the `api/routers` directory.
 */
export const rootRouter = router({})

export type RootRouter = typeof rootRouter
