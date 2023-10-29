import chainMiddlewares from "./lib/utils/middleware"
import i18n from "./middlewares/i18n"

export default chainMiddlewares([i18n])

export const config = {
	matcher: ["/((?!api|_next|.*\\..*).*)"],
}
