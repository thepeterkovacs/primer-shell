import { execa } from "execa"

import logError from "./error.js"

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
		logError(
			"Project name validation failed",
			'Project name does not match regex /^[^\\/:*?"<>|]+$/'
		)
	}
}

/**
 * Asynchronously checks if Git is installed on the system.
 * @returns {Promise<void>} A Promise that resolves if Git is installed.
 * @example
 * await checkGitExists()
 */
export async function checkGitExists(): Promise<void> {
	try {
		await execa("git", ["--version"])
	} catch (err) {
		logError("Git is not installed (https://git-scm.com/downloads)", err)
	}
}
