import { headers } from "next/headers"
import { notFound } from "next/navigation"
import { PropsWithChildren } from "react"

import * as fonts from "assets/fonts"
import { locales } from "i18n/config"
import { cn } from "utils/standard"

import RootProvider from "providers/RootProvider"

import "styles/globals.css"

export function generateStaticParams() {
	return locales.map((locale) => ({ locale: locale.lang }))
}

interface Props extends PropsWithChildren {
	params: {
		locale: string
	}
}

export default function RootLayout({ children, params: { locale } }: Props) {
	if (!locales.map((locale) => locale.lang).includes(locale)) notFound()

	return (
		<html lang={locale} suppressHydrationWarning>
			<body className={cn("relative h-full font-sans antialiased", fonts.inter.className)}>
				<RootProvider headers={headers()} locale={locale}>
					{children}
				</RootProvider>
			</body>
		</html>
	)
}
