import { NextRequest } from "next/server"

import authMiddleware from "middlewares/auth"
import i18nMiddleware from "middlewares/i18n"

import { locales } from "i18n/config"

/**
 * Pages that do not need authentication to access.
 */
const publicPages = ["/", "/auth"]

const publicPathnameRegex = RegExp(
	`^(/(${locales.map((locale) => locale.lang).join("|")}))?(${publicPages.join("|")})?/?$`,
)

export default function middleware(req: NextRequest) {
	if (publicPathnameRegex.test(req.nextUrl.pathname)) {
		return i18nMiddleware(req)
	} else {
		// @ts-ignore
		return authMiddleware(req)
	}
}

export const config = {
	matcher: ["/", "/(en|hu)/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
