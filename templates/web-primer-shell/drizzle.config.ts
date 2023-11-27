import * as dotenv from "dotenv"
import type { Config } from "drizzle-kit"

dotenv.config({
	path: ".env.local",
})

/**
 * Prefix applied to all generated table names.
 */
export const tablesFilterPrefix = ""

export default {
	dbCredentials: {
		url: "sqlite.db",
	},
	driver: "better-sqlite",
	out: "./src/server/database/out",
	schema: "./src/server/database/schema/*.ts",
	strict: true,
	tablesFilter: [`${tablesFilterPrefix}*`],
	verbose: true,
} satisfies Config
