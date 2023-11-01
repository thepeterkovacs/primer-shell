import cliSpinners from "cli-spinners"
import { execa } from "execa"
import figlet from "figlet"
import { promises } from "fs"
import fsExtra from "fs-extra"
import gradient from "gradient-string"
import inquirer from "inquirer"
import { oraPromise } from "ora"
import path from "path"

import { ROOT_PATH } from "./config.js"
import type { Template } from "./types.js"
import error, { getVersion, validateProjectName } from "./utils.js"

/**
 * Asynchronously generates and displays a styled title using the Figlet library.
 * @param {string} title Text to be styled and displayed as a title.
 * @param {figlet.Fonts} font Figlet font to be used for styling the title.
 * @returns {Promise<void>} A Promise that resolves once the title is displayed.
 * @example
 * await showTitle("Title", "Doom")
 */
export async function showTitle(title: string, font: figlet.Fonts): Promise<void> {
	return new Promise<void>(function (resolve) {
		figlet.text(title, { font }, function (err, data) {
			if (err) {
				error("Error while showing title", err)
			}

			console.log(gradient.vice(data))

			return resolve()
		})
	})
}

/**
 * Asynchronously prompts the user to input the project name and returns the entered name.
 * @returns {Promise<string>} A Promise that resolves with the entered project name.
 * @example
 * const projectName = await inputProjectName()
 */
export async function inputProjectName(): Promise<string> {
	const { projectName }: { projectName: string } = await inquirer.prompt([
		{
			name: "projectName",
			type: "input",
			message: "What is the name of your project?",
		},
	])

	validateProjectName(projectName)

	return projectName
}

/**
 * Asynchronously prompts the user to select a template and returns the chosen one.
 * @returns {Promise<Template>} A Promise that resolves with the selected template.
 * @example
 * const template = await selectTemplate()
 */
export async function selectTemplate(): Promise<Template> {
	const answer: { template: Template } = await inquirer.prompt([
		{
			name: "template",
			type: "list",
			message: "Which template would you like to use?",
			choices: [
				{
					name: "Web Primer Shell",
					value: "web-primer-shell",
				},
				{
					name: "Node Primer Shell",
					value: "node-primer-shell",
					disabled: "Coming soon",
				},
			],
		},
	])

	return answer.template
}

/**
 * Asynchronously sets up the project based on the specified template and project name.
 * @param {Template} template Template used for project setup.
 * @param {string} projectName Name of the project to be set up.
 * @returns {Promise<void>} A Promise that resolves once the project setup is completed successfully.
 * @example
 * await setupProject("web-primer-shell", "project-name")
 */
export async function setupProject(template: Template, projectName: string): Promise<void> {
	try {
		await oraPromise(setupProcess(template, projectName), {
			text: "Setting up project...",
			successText: "Project setup completed successfully",
			spinner: cliSpinners.binary,
			color: "cyan",
		})
	} catch (err) {
		error("Project setup failed", err)
	}
}

/**
 * Asynchronously sets up a new project by copying a template and configuring its package.json.
 * @param {Template} template Template to copy for the new project.
 * @param {string} projectName Name of the new project.
 * @returns {Promise<void>} A promise that resolves when the setup process is complete.
 */
async function setupProcess(template: Template, projectName: string): Promise<void> {
	await copyTemplate(template, projectName)
	await setupPackageJson(projectName)
}

/**
 * Asynchronously copies a template directory to a new project directory.
 * @param {Template} template Name of the template to copy.
 * @param {string} projectName Name of the new project directory.
 * @returns {Promise<void>} A Promise that resolves when the copy operation is complete.
 */
async function copyTemplate(template: Template, projectName: string): Promise<void> {
	await promises.cp(
		path.join(ROOT_PATH, `templates/${template}`),
		path.resolve(process.cwd(), projectName),
		{
			recursive: true,
		}
	)
}

/**
 * Asynchronously sets up the package.json file for a project.
 * @param {string} projectName Name of the project.
 * @returns {Promise<void>} A promise that resolves when the package.json setup is complete.
 */
async function setupPackageJson(projectName: string): Promise<void> {
	const packageJson = fsExtra.readJSONSync(
		path.join(process.cwd(), `${projectName}/package.json`)
	)

	packageJson.name = projectName as string
	packageJson["primerShell"] = { version: getVersion() }

	fsExtra.writeJSONSync(path.join(ROOT_PATH, `${projectName}/package.json`), packageJson, {
		spaces: "\t",
	})
}

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
				color: "cyan",
			}
		)
	} catch (err) {
		error("VSCode could not start", err)
	}
}
