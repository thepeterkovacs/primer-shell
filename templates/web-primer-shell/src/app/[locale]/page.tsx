import packageJson from "~/package.json"

export default function HomePage() {
	return (
		<div className="flex h-screen items-center justify-center">
			<h1 className="text-2xl tracking-tight md:text-4xl">{packageJson.name}</h1>
		</div>
	)
}
