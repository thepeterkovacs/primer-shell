"use client"

import { MoonIcon, SunIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import * as React from "react"

import { Button } from "@/components/layout/Button"

export default function ThemeToggle(): JSX.Element {
	const { theme, setTheme } = useTheme()

	return (
		<Button
			variant="ghost"
			size="sm"
			onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
			<SunIcon className="h-5 w-5 scale-100 dark:scale-0" />
			<MoonIcon className="absolute h-5 w-5 scale-0 dark:scale-100" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	)
}
