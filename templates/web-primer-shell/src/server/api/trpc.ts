import { TRPCError, inferRouterInputs, inferRouterOutputs, initTRPC } from "@trpc/server"
import { Session } from "next-auth"
import { NextRequest } from "next/server"
import { ZodError } from "zod"

import { RootRouter } from "api/root"

import { getServerAuthSession } from "auth/session"

export interface Context {
	headers: Headers | null
	session: Session | null
}

/**
 * Data that all procedures have access to.
 */
export const context = async (opts: { req: NextRequest }): Promise<Context> => {
	const session = await getServerAuthSession()

	return {
		headers: opts.req.headers,
		session,
	}
}

const trpc = initTRPC.context<Context>().create({
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

export type RouterInputs = inferRouterInputs<RootRouter>
export type RouterOutputs = inferRouterOutputs<RootRouter>
