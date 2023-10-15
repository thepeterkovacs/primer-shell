import inquirer from "inquirer"

/**
 * Asynchronously prompts the user to input the project name and returns the entered name.
 * @returns {Promise<string>} A Promise that resolves with the entered project name.
 * @example
 * const projectName = await inputProjectName()
 */
export default async function inputProjectName(): Promise<string> {
	const answer: { projectName: string } = await inquirer.prompt([
		{
			name: "projectName",
			type: "input",
			message: "What is the name of your project?",
		},
	])

	return answer.projectName
}
