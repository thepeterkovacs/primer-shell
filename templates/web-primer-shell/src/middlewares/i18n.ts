import createMiddleware from "next-intl/middleware"

import { defaultLocale, locales } from "i18n/config"

const i18nMiddleware = createMiddleware({
	locales: locales.map((locale) => locale.lang),
	defaultLocale,
	localePrefix: "never",
})

export default i18nMiddleware
