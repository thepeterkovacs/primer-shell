import { appRouter } from "@/server/api/appRouter"
import { renderTrpcPanel } from "trpc-panel"

export async function GET() {
	return new Response(
		renderTrpcPanel(appRouter, {
			url: `${process.env.NEXT_PUBLIC_URL}/api/trpc`,
		}),
		{
			status: 200,
			headers: { "Content-Type": "text/html" },
		}
	)
}
