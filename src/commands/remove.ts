import { execa } from "execa"

/**
 * Asynchronously removes specific files from the given project.
 * @param {string} projectName Name of the project from which files will be removed.
 * @returns {Promise<void>} A Promise that resolves once the files are removed successfully.
 * @example
 * await removeFiles("myProjectName")
 */
export default async function removeFiles(projectName: string): Promise<void> {
	await execa("rd", ["/s", "/q", `${projectName}\\.git`], { shell: true })

	await execa(
		"del",
		[
			"/f",
			`${projectName}\\CHANGELOG.md`,
			`${projectName}\\LICENSE.md`,
			`${projectName}\\SECURITY.md`,
			`${projectName}\\README.md`,
		],
		{
			shell: true,
		}
	)
}
