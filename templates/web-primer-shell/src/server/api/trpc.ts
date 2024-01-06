import { TRPCError, inferRouterInputs, inferRouterOutputs, initTRPC } from "@trpc/server"
import { Session } from "next-auth"
import superjson from "superjson"
import { ZodError } from "zod"

import { RootRouter } from "api/root"
import { Db, db } from "database/connection"

import { getServerAuthSession } from "auth/session"

export interface Context {
	db: Db
	session: Session | null
}

/**
 * Data that all procedures have access to.
 */
export const context = async (): Promise<Context> => {
	const session = await getServerAuthSession()

	return {
		db,
		session,
	}
}

const trpc = initTRPC.context<Context>().create({
	transformer: superjson,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
			},
		}
	},
})

export const router = trpc.router

/**
 * Publicly available procedure without any authentication required.
 */
export const publicProcedure = trpc.procedure

/**
 * Procedure only available with an existing session.
 */
export const privateProcedure = trpc.procedure.use(
	trpc.middleware(({ ctx, next }) => {
		if (!ctx.session || !ctx.session.user) {
			throw new TRPCError({ code: "UNAUTHORIZED" })
		}

		return next({
			ctx: {
				session: { ...ctx.session, user: ctx.session.user },
			},
		})
	}),
)

/**
 * Router input type helper.
 * @example
 * type RouterInput = RouterInputs["router"]["procedure"]
 */
export type RouterInputs = inferRouterInputs<RootRouter>

/**
 * Router output type helper.
 * @example
 * type RouterOutput = RouterOutputs["router"]["procedure"]
 * */
export type RouterOutputs = inferRouterOutputs<RootRouter>
