import { trpcServer } from "@/lib/utils/trpc/server"

import ExampleDataComponent from "./ExampleDataComponent"

export default async function TrpcPage() {
	const exampleData = await trpcServer.example.getData()

	return (
		<main className="flex h-screen items-center justify-center gap-2">
			<ExampleDataComponent initialData={exampleData} />
		</main>
	)
}
