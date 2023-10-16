import inquirer from "inquirer"

/**
 * Asynchronously prompts the user to select a template and returns the chosen one.
 * @returns {Promise<string>} A Promise that resolves with the selected template.
 * @example
 * const template = await selectTemplate()
 */
export default async function selectTemplate(): Promise<string> {
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
