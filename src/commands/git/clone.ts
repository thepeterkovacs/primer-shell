import { execa } from "execa"

/**
 * Asynchronously clones a Git repository based on the specified template into the folder with the provided project name.
 * @param {string} template Template to determine the repository to clone.
 * @param {string} projectName Name of the project where the repository will be cloned.
 * @returns {Promise<void>} A Promise that resolves once the repository is cloned successfully.
 */
export default async function cloneRepository(
	template: string,
	projectName: string
): Promise<void> {
	let repository = ""

	switch (template) {
		case "Web":
			repository = "web-primer-shell"
			break
	}

	await execa("git", [
		"clone",
		`https://github.com/thepeterkovacs/${repository}.git`,
		projectName,
	])
}
