import { execa } from "execa"

/**
 * Asynchronously clones a Git repository based on the specified template into the folder with the provided project name.
 * @param {string} template Template to determine the repository to clone.
 * @param {string} projectName Name of the project where the repository will be cloned.
 * @returns {Promise<void>} A Promise that resolves once the repository is cloned successfully.
 * @example
 * await cloneRepository("Web", "myProjectName")
 */
export default async function cloneRepository(
	template: string,
	projectName: string
): Promise<void> {
	await execa("git", ["clone", `https://github.com/thepeterkovacs/${template}.git`, projectName])
}
