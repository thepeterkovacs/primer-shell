#!/usr/bin/env node
import { APP_NAME } from "~/config.js"
import { inputProjectName, selectTemplate, setupProject, showTitle, startVscode } from "~/lib.js"

await showTitle(APP_NAME, "Doom")

const template = await selectTemplate()
const projectName = await inputProjectName()

await setupProject(template, projectName)

await startVscode(projectName)

process.exit(0)
