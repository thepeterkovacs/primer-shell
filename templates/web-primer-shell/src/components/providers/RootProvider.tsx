import { getServerSession } from "next-auth"

import { PropsWithChildren } from "react"

import options from "@/lib/auth/options"

import DevTools from "../tools/DevTools"
import { Toaster } from "../tools/Toaster"
import IntlClientProvider from "./IntlClientProvider"
import QueryProvider from "./QueryProvider"
import SessionProvider from "./SessionProvider"
import ThemeProvider from "./ThemeProvider"

interface Props extends PropsWithChildren {
	locale: string
}

export default async function RootProvider({ children, locale }: Props): Promise<JSX.Element> {
	const session = await getServerSession(options)

	return (
		<SessionProvider session={session}>
			<QueryProvider>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					<IntlClientProvider locale={locale}>
						{children}
						<Toaster />
						<DevTools />
					</IntlClientProvider>
				</ThemeProvider>
			</QueryProvider>
		</SessionProvider>
	)
}
