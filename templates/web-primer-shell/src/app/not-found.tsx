"use client"

import Error from "next/error"

export default function NotFoundPage() {
	return (
		<html>
			<body>
				<Error statusCode={404} />
			</body>
		</html>
	)
}
