import cliSpinners from "cli-spinners"
import { execa } from "execa"
import { oraPromise } from "ora"

import error from "../../lib/error.js"

/**
 * Asynchronously starts Visual Studio Code (VSCode) for the specified project.
 * @param {string} projectName Name of the project for which VSCode will be started.
 * @returns {Promise<void>} A Promise that resolves once VSCode is started successfully.
 * @examplestartVscode
 * await startVscode("project-name")
 */
export async function startVscode(projectName: string): Promise<void> {
	try {
		await oraPromise(
			execa("code", [projectName]),

			{
				text: "Starting VSCode...",
				successText: "VSCode started successfully",
				spinner: cliSpinners.binary,
				color: "yellow",
			}
		)
	} catch (err) {
		error("VSCode could not start", err)
	}
}
