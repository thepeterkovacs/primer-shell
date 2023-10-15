import error from "./error.js"

/**
 * Validates the provided project name against a specific regex pattern.
 * @param {string} projectName Project name to be validated.
 * @returns {void}
 * @example
 * validateProjectName("myProjectName")
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
