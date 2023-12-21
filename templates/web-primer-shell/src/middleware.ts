import { NextRequest } from "next/server"

import authMiddleware from "middlewares/auth"
import i18nMiddleware from "middlewares/i18n"

import { locales } from "i18n/config"
import { log } from "utils/standard"

/**
 * Pages that do not need authentication to access.
 */
const publicPages = ["/", "/auth"]

const publicPathnameRegex = RegExp(
	`^(/(${locales.map((locale) => locale.lang).join("|")}))?(${publicPages.join("|")})?/?$`,
)

export default function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl

	log(`middleware handling for "${pathname}" path`, "yellow", true)

	if (publicPathnameRegex.test(pathname)) {
		return i18nMiddleware(req)
	} else {
		// @ts-ignore
		return authMiddleware(req)
	}
}

export const config = {
	/** Matches any URL path that does not start with "api", "_next/static", "_next/image", or "favicon.ico". */
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
