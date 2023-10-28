import * as dotenv from "dotenv"
import type { Config } from "drizzle-kit"

dotenv.config({
	path: ".env.local",
})

export default {
	schema: "./src/server/database/schema/*.ts",
	out: "./src/server/database/out",
	driver: "mysql2",
	dbCredentials: {
		connectionString: process.env.PS_DB_URL,
	},
	tablesFilter: [""],
	verbose: true,
	breakpoints: true,
} satisfies Config
