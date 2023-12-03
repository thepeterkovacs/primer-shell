import { NextRequest } from "next/server"

import authMiddleware from "middlewares/auth"
import i18nMiddleware from "middlewares/i18n"

import { locales } from "i18n/config"
import { isDevEnv } from "utils/standard"

/**
 * Pages that do not need authentication to access.
 */
const publicPages = ["/", "/auth"]

const publicPathnameRegex = RegExp(
	`^(/(${locales.map((locale) => locale.lang).join("|")}))?(${publicPages.join("|")})?/?$`,
)

export default function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl

	if (isDevEnv()) {
		console.log(`middleware handling for ${pathname} path`)
	}

	if (publicPathnameRegex.test(pathname)) {
		return i18nMiddleware(req)
	} else {
		// @ts-ignore
		return authMiddleware(req)
	}
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
