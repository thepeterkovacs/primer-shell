import { PropsWithChildren } from "react"

import { getServerAuthSession } from "@/lib/auth/session"

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
	const session = await getServerAuthSession()

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
