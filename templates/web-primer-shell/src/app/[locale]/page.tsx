import packageJson from "~/package.json"

export default function HomePage() {
	return (
		<main className="flex h-full items-center justify-center">
			<h1 className="text-4xl">{packageJson.name}</h1>
		</main>
	)
}
