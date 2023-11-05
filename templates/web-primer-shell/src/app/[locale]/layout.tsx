import { PropsWithChildren } from "react"

import "@/styles/globals.css"

import * as fonts from "@/lib/assets/fonts"

import RootProvider from "@/components/providers/RootProvider"

import { rootMetadata } from "@/app/metadata"

interface Props extends PropsWithChildren {
	params: {
		locale: string
	}
}

export const metadata = rootMetadata

export default function RootLayout({ children, params: { locale } }: Props) {
	return (
		<html lang={locale} suppressHydrationWarning>
			<body className={fonts.inter.className}>
				<RootProvider locale={locale}>{children}</RootProvider>
			</body>
		</html>
	)
}
