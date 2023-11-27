import { NextIntlClientProvider } from "next-intl"
import { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
	locale: string
}

export default async function IntlClientProvider({
	children,
	locale,
}: Props): Promise<JSX.Element> {
	const messages = (await import(`../../lib/i18n/messages/${locale}.json`)).default

	return (
		<NextIntlClientProvider locale={locale} messages={messages}>
			{children}
		</NextIntlClientProvider>
	)
}
