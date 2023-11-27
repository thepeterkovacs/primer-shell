import { PropsWithChildren } from "react"

import { getServerAuthSession } from "auth/session"

import IntlClientProvider from "providers/IntlClientProvider"
import QueryProvider from "providers/QueryProvider"
import SessionProvider from "providers/SessionProvider"
import ThemeProvider from "providers/ThemeProvider"
import DevTools from "tools/DevTools"
import { Toaster } from "tools/Toaster"

interface Props extends PropsWithChildren {
	headers: Headers
	locale: string
}

export default async function RootProvider({
	headers,
	locale,
	children,
}: Props): Promise<JSX.Element> {
	const session = await getServerAuthSession()

	return (
		<SessionProvider session={session}>
			<QueryProvider headers={headers}>
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
