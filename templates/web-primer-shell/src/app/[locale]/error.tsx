"use client"

import Error from "next/error"

interface Props {
	error: InstanceType<ErrorConstructor>
}

export default function ErrorPage({ error }: Props) {
	return <Error statusCode={400} title={error.message} />
}
