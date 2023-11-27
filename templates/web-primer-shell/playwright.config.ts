import { defineConfig, devices } from "@playwright/test"
import * as dotenv from "dotenv"

dotenv.config({
	path: ".env.local",
})

export default defineConfig({
	forbidOnly: !!process.env.CI,
	fullyParallel: true,
	outputDir: "./tests/out",
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
		{
			name: "firefox",
			use: { ...devices["Desktop Firefox"] },
		},
		{
			name: "webkit",
			use: { ...devices["Desktop Safari"] },
		},
	],
	reporter: [["list"], ["html", { outputFolder: "tests/export", open: "never" }]],
	retries: process.env.CI ? 2 : 0,
	testDir: "./tests",
	use: {
		baseURL: process.env.NEXT_PUBLIC_URL,
	},
	webServer: {
		command: "npm run dev",
		url: process.env.NEXT_PUBLIC_URL,
		reuseExistingServer: !process.env.CI,
	},
	workers: process.env.CI ? 1 : undefined,
})
