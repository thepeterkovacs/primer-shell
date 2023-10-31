"use client"

import { trpcClient } from "@/lib/utils/trpc/client"
import { trpcServer } from "@/lib/utils/trpc/server"

import { Button } from "@/components/layout/Button"

interface Props {
	initialData: Awaited<ReturnType<(typeof trpcServer)["example"]["getData"]>>
}

export default function ExampleDataComponent({ initialData }: Props) {
	const getData = trpcClient.example.getData.useQuery(undefined, {
		initialData,
		refetchOnMount: false,
		refetchOnReconnect: false,
		refetchOnWindowFocus: false,
		retry: 2,
		retryDelay: 2000,
	})

	const postData = trpcClient.example.postData.useMutation({
		onSettled: () => {
			getData.refetch()
		},
	})

	const deleteData = trpcClient.example.deleteData.useMutation({
		onSettled: () => {
			getData.refetch()
		},
	})

	const { isFetching, isError, error } = getData

	if (isError) {
		return (
			<div className="flex flex-col items-center gap-8">
				<Button
					onClick={async () => {
						deleteData.mutate()
					}}>
					Reset storage
				</Button>
				<span className="text-2xl">{error.message}</span>
			</div>
		)
	}

	if (isFetching) {
		return (
			<div className="flex items-center">
				<span className="text-2xl">refetching data...</span>
			</div>
		)
	}

	return (
		<div className="flex flex-col items-center gap-8">
			<Button
				onClick={async () => {
					postData.mutate({ data: "new_data" })
				}}>
				Add new data
			</Button>
			<div className="flex w-1/4 flex-wrap items-center justify-center gap-4">
				{getData.data.map((data) => (
					<span key={data.id}>{JSON.stringify(data)}</span>
				))}
			</div>
		</div>
	)
}
