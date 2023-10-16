#!/usr/bin/env node
import checkGitExists from "./commands/git/check.js"
import inputProjectName from "./commands/prompts/projectName.js"
import selectTemplate from "./commands/prompts/template.js"
import projectSetup from "./commands/setup.js"
import showTitle from "./commands/title.js"
import { startVscode } from "./commands/vscode/start.js"

await showTitle("Primer Shell", "Doom")

const template = await selectTemplate()
const projectName = await inputProjectName()

await checkGitExists()

await projectSetup(template, projectName)

await startVscode(projectName)

process.exit(0)
