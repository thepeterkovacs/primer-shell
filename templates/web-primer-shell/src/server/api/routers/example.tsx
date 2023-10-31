import { TRPCError } from "@trpc/server"
import { z } from "zod"

import { publicProcedure, router } from "../trpc"

let exampleDataStorage = [
	{
		id: 1,
		data: "existing_data",
	},
	{
		id: 2,
		data: "existing_data",
	},
]

const getDataOutputType = z.array(z.object({ id: z.number(), data: z.string() }))

const postDataInputType = z.object({ data: z.string() })

export const exampleRouter = router({
	getData: publicProcedure.output(getDataOutputType).query(async () => {
		if (exampleDataStorage.length >= 5) {
			throw new TRPCError({
				code: "INTERNAL_SERVER_ERROR",
				message: "Example data storage full.",
			})
		}

		await new Promise((resolve) => setTimeout(resolve, 1000))

		return exampleDataStorage
	}),
	postData: publicProcedure.input(postDataInputType).mutation(({ input }) => {
		exampleDataStorage.push({
			id: exampleDataStorage[exampleDataStorage.length - 1].id + 1,
			data: input.data,
		})
	}),
	deleteData: publicProcedure.mutation(() => {
		exampleDataStorage.slice(0, -3)
	}),
})
