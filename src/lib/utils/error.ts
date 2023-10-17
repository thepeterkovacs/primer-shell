import chalk from "chalk"

/**
 * Logs an error message with a specified title and optional details to the console, then exits the process with an error code.
 * @param {string} title Title of the error message.
 * @param {unknown} [details] Optional details or additional information about the error.
 * @returns {void}
 * @example
 * logError("Error")
 */
export default function logError(title: string, details?: unknown): void {
	console.log(chalk.bgRed(title + "\n"))

	if (details) {
		console.log(chalk.red(details + "\n"))
	}

	process.exit(1)
}
