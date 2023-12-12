import chalk from "chalk"
import fsExtra from "fs-extra"
import path from "path"

import { ROOT_PATH } from "~/config.js"

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
	const regex = /^(?:(?:@(?:[a-z0-9-*~][a-z0-9-*._~]*)?\/[a-z0-9-._~])|[a-z0-9-~])[a-z0-9-._~]*$/

	if (!regex.test(projectName)) {
		error(
			"Project name validation failed",
			"Project name does not match regex /^(?:(?:@(?:[a-z0-9-*~][a-z0-9-*._~]*)?/[a-z0-9-._~])|[a-z0-9-~])[a-z0-9-._~]*$/"
		)
	}
}

/**
 * Retrieves the version from the package.json file located at the root path.
 * @returns {string} The version string from the package.json file.
 * @example
 * const version = getVersion()
 */
export function getVersion(): string {
	const packageJson = fsExtra.readJSONSync(path.join(ROOT_PATH, "package.json"))

	return packageJson.version as string
}
