import cliSpinners from "cli-spinners"
import { promises } from "fs"
import { oraPromise } from "ora"
import path from "path"

import { ROOT_PATH } from "../../config.js"
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
		await oraPromise(copyTemplate(template, projectName), {
			text: "Setting up project...",
			successText: "Project setup completed successfully",
			spinner: cliSpinners.binary,
			color: "cyan",
		})
	} catch (err) {
		logError("Project setup failed", err)
	}
}

/**
 * Asynchronously copies a template directory to a new project directory.
 * @param {string} template Name of the template to copy.
 * @param {string} projectName Name of the new project directory.
 * @returns {Promise<void>} A Promise that resolves when the copy operation is complete.
 */
async function copyTemplate(template: string, projectName: string): Promise<void> {
	await promises.cp(
		path.join(ROOT_PATH, `src/templates/${template}`),
		path.resolve(process.cwd(), projectName),
		{
			recursive: true,
		}
	)
}
