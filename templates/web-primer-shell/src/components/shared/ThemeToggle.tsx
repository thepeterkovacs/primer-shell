"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import * as React from "react"

import { Button } from "ui/Button"

export default function ThemeToggle(): JSX.Element {
	const { theme, setTheme } = useTheme()

	return (
		<Button
			variant="ghost"
			// size="sm"
			onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
			<SunIcon className="h-6 w-6 scale-100 dark:scale-0" />
			<MoonIcon className="absolute h-6 w-6 scale-0 dark:scale-100" />
		</Button>
	)
}
