import { execa } from "execa"

import logError from "../../lib/error.js"

/**
 * Asynchronously checks if Git is installed on the system.
 * @returns {Promise<void>} A Promise that resolves if Git is installed.
 * @example
 * await checkGitExists()
 */
export default async function checkGitExists(): Promise<void> {
	try {
		await execa("git", ["--version"])
	} catch (err) {
		logError("Git is not installed (https://git-scm.com/downloads)", err)
	}
}
