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
		await new Promise((resolve) => setTimeout(resolve, 1000))

		return exampleDataStorage
	}),
	postData: publicProcedure.input(postDataInputType).mutation(async ({ input }) => {
		exampleDataStorage.push({
			id: exampleDataStorage[exampleDataStorage.length - 1].id + 1,
			data: input.data,
		})
	}),
})
