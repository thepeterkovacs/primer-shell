import { Metadata } from "next/types"

export const rootMetadata: Metadata = {
	title: "Web Primer Shell",
	icons: {
		icon: [
			{
				url: "/shell-black.png",
				media: "(prefers-color-scheme: light)",
			},
			{
				url: "/shell-white.png",
				media: "(prefers-color-scheme: dark)",
			},
		],
	},
}
