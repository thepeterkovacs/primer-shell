import Database from "better-sqlite3"
import { drizzle } from "drizzle-orm/better-sqlite3"

const sqlite = new Database("sqlite.db")

/**
 * Represents a database instance used to access data from the created database tables.
 */
export const db = drizzle(sqlite)

export type Db = typeof db
