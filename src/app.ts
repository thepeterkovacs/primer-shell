#!/usr/bin/env node
import { inputProjectName, selectTemplate } from "./lib/commands/prompt.js"
import projectSetup from "./lib/commands/setup.js"
import showTitle from "./lib/commands/title.js"
import { startVscode } from "./lib/commands/vscode.js"
import { checkGitExists } from "./lib/utils/validation.js"

await showTitle("Primer Shell", "Doom")

const template = await selectTemplate()
const projectName = await inputProjectName()

await checkGitExists()

await projectSetup(template, projectName)

await startVscode(projectName)

process.exit(0)
