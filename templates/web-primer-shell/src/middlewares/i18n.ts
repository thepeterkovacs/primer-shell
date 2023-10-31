import createMiddleware from "next-intl/middleware"

import { NextRequest, NextResponse } from "next/server"

import { defaultLocale, locales } from "@/lib/i18n/config"

export default function i18n(): (request: NextRequest) => NextResponse<unknown> {
	return createMiddleware({
		locales: locales.map((locale) => locale.lang),
		defaultLocale,
		localePrefix: "never",
	})
}
