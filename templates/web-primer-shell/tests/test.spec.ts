import { expect, test } from "@playwright/test"

const url = process.env.NEXT_PUBLIC_URL

test("test", async ({ page }) => {
	await page.goto(url)

	await expect(page).toHaveURL(url)
})
