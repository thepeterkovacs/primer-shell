import chalk from "chalk"

/**
 * Logs an error message with a specified title and optional details to the console, then exits the process with an error code.
 * @param {string} title Title of the error message.
 * @param {unknown} [details] Optional details or additional information about the error.
 * @returns {void}
 * @example
 * error("Error")
 */
export default function error(title: string, details?: unknown): void {
	console.error(chalk.bgRed(title + "\n"))

	if (details) {
		console.error(chalk.red(details + "\n"))
	}

	process.exit(1)
}

/**
 * Validates the provided project name against a specific regex pattern.
 * @param {string} projectName Project name to be validated.
 * @returns {void}
 * @example
 * validateProjectName("project-name")
 */
export function validateProjectName(projectName: string): void {
	const regex = /^[^\\/:\*\?"<>\|]+$/

	if (!regex.test(projectName)) {
		error(
			"Project name validation failed",
			'Project name does not match regex /^[^\\/:*?"<>|]+$/'
		)
	}
}
