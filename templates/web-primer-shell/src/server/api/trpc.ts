import { initTRPC } from "@trpc/server"

const t = initTRPC.create()

export const authProcedure = t.middleware(({ next }) => {
	return next()
})

export const router = t.router

export const publicProcedure = t.procedure
export const privateProcedure = t.procedure.use(authProcedure)
