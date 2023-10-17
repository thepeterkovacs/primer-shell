import inquirer from "inquirer"

import { validateProjectName } from "../../lib/utils/validation.js"

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
 * @returns {Promise<string>} A Promise that resolves with the selected template.
 * @example
 * const template = await selectTemplate()
 */
export async function selectTemplate(): Promise<string> {
	const answer: { template: string } = await inquirer.prompt([
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
