import cliSpinners from "cli-spinners"
import { execa } from "execa"
import { oraPromise } from "ora"

import logError from "../utils/error.js"

/**
 * Asynchronously sets up the project based on the specified template and project name.
 * @param {string} template Template used for project setup.
 * @param {string} projectName Name of the project to be set up.
 * @returns {Promise<void>} A Promise that resolves once the project setup is completed successfully.
 * @example
 * await projectSetup("template", "project-name")
 */
export default async function projectSetup(template: string, projectName: string): Promise<void> {
	try {
		await oraPromise(setupProcess(template, projectName), {
			text: "Setting up project...",
			successText: "Project setup completed successfully",
			spinner: cliSpinners.binary,
			color: "cyan",
		})
	} catch (err) {
		logError("Project setup failed", err)
	}
}

async function setupProcess(template: string, projectName: string) {
	await cloneRepository(template, projectName)
}

/**
 * Asynchronously clones a Git repository based on the specified template into the folder with the provided project name.
 * @param {string} template Template to determine the repository to clone.
 * @param {string} projectName Name of the project where the repository will be cloned.
 * @returns {Promise<void>} A Promise that resolves once the repository is cloned successfully.
 * @example
 * await cloneRepository("template", "project-name")
 */
async function cloneRepository(template: string, projectName: string): Promise<void> {
	await execa("git", ["clone", `https://github.com/thepeterkovacs/${template}.git`, projectName])
}
