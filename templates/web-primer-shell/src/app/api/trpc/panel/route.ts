import { renderTrpcPanel } from "trpc-panel"

import { rootRouter } from "api/root"

import { getTrpcUrl } from "utils/standard"

export async function GET() {
	return new Response(
		renderTrpcPanel(rootRouter, {
			url: getTrpcUrl(),
		}),
		{
			status: 200,
			headers: { "Content-Type": "text/html" },
		},
	)
}
