import packageJson from "~/package.json"

export default function HomePage() {
	return (
		<main className="flex h-screen items-center justify-center">
			<h1 className="text-5xl">{packageJson.name}</h1>
		</main>
	)
}
