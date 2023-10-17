import cliSpinners from "cli-spinners"
import { execa } from "execa"
import { promises } from "fs"
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
	await removeFiles(projectName)
	await createPackageJson(template, projectName)
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

/**
 * Asynchronously removes specific files from the given project.
 * @param {string} projectName Name of the project from which files will be removed.
 * @returns {Promise<void>} A Promise that resolves once the files are removed successfully.
 * @example
 * await removeFiles("project-name")
 */
async function removeFiles(projectName: string): Promise<void> {
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

/**
 * Asynchronously creates a `package.json` file for the specified project using the provided template.
 * @param {string} template Template used to generate the content.
 * @param {string} projectName Name of the project for which the `package.json` file is created.
 * @returns {Promise<void>} A Promise that resolves once the `package.json` file is created successfully.
 * @example
 * await createPackageJson("template", "project-name")
 */
async function createPackageJson(template: string, projectName: string): Promise<void> {
	const content = getContent(template, projectName)

	await promises.writeFile(
		`${projectName}\\package.json`,
		JSON.stringify(content, null, "\t") + "\n"
	)
}

function getContent(template: string, projectName: string) {
	switch (template) {
		case "web-primer-shell":
			return {
				name: projectName,
				version: "0.0.0",
				private: true,
				license: "MIT",
				engines: {
					node: ">=18.17.1",
				},
				packageManager: "pnpm@8.7.1",
				scripts: {
					dev: "next dev",
					build: "next build",
					start: "next start",
					lint: "next lint",
					format: "pnpm prettier . --write",
					test: "playwright test",
					report: "pnpm playwright show-report tests\\export",
					"db:migrate": "drizzle-kit generate:mysql",
					"db:push": "drizzle-kit push:mysql",
					"db:studio": "drizzle-kit studio --port 4000 --verbose",
				},
				dependencies: {
					"@planetscale/database": "^1.11.0",
					"@radix-ui/react-icons": "^1.3.0",
					"@radix-ui/react-slot": "^1.0.2",
					"@radix-ui/react-toast": "^1.1.4",
					"@tanstack/react-query": "^4.33.0",
					"@tanstack/react-query-devtools": "^4.33.0",
					"@trpc/client": "^10.38.0",
					"@trpc/react-query": "^10.38.0",
					"@trpc/server": "^10.38.0",
					autoprefixer: "10.4.15",
					"class-variance-authority": "^0.7.0",
					clsx: "^2.0.0",
					dotenv: "^16.3.1",
					"drizzle-orm": "^0.28.5",
					eslint: "8.48.0",
					"eslint-config-next": "13.4.19",
					"lucide-react": "^0.276.0",
					mysql2: "^3.6.0",
					next: "13.4.19",
					"next-auth": "^4.23.1",
					"next-intl": "^2.20.0",
					"next-themes": "^0.2.1",
					postcss: "8.4.28",
					react: "18.2.0",
					"react-dom": "18.2.0",
					"tailwind-merge": "^1.14.0",
					tailwindcss: "3.3.3",
					"tailwindcss-animate": "^1.0.7",
					typescript: "5.2.2",
					zod: "^3.22.2",
				},
				devDependencies: {
					"@playwright/test": "^1.37.1",
					"@trivago/prettier-plugin-sort-imports": "^4.2.0",
					"@types/node": "20.5.7",
					"@types/react": "18.2.21",
					"@types/react-dom": "18.2.7",
					"drizzle-kit": "^0.19.13",
				},
			}
	}
}
