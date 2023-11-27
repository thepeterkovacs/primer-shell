import withAuth from "next-auth/middleware"

import i18nMiddleware from "middlewares/i18n"

const authMiddleware = withAuth(
	function onSuccess(req) {
		return i18nMiddleware(req)
	},
	{
		pages: {
			signIn: "/auth",
		},
	},
)

export default authMiddleware
