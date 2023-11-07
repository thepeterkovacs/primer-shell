import * as fonts from "@/lib/assets/fonts"
import { cn } from "@/lib/utils/standard"

export default function HomePage() {
	return (
		<main className="flex h-screen items-center justify-center">
			<h1 className={cn("text-5xl", fonts.orbitron.className)}>Web Primer Shell</h1>
		</main>
	)
}
