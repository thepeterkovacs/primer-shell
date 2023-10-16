import cliSpinners from "cli-spinners"
import { oraPromise } from "ora"

import logError from "../lib/error.js"
import cloneRepository from "./git/clone.js"
import { createPackageJson } from "./npm/package.js"
import removeFiles from "./remove.js"

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
	await removeFiles(projectName)
	await createPackageJson(template, projectName)
}
