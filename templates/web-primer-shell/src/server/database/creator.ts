import { sqliteTableCreator } from "drizzle-orm/sqlite-core"

import { tablesFilterPrefix } from "~/drizzle.config"

/**
 * Creates a database table using the provided `tablesFilterPrefix` from `drizzle.config.ts`.
 */
export const dbTable = sqliteTableCreator((name) => `${tablesFilterPrefix}${name}`)
