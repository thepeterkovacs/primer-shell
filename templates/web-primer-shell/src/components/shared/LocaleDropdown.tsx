"use client"

import { LanguagesIcon } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

import { locales } from "i18n/config"

import { Button } from "ui/Button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "ui/DropdownMenu"

export default function LocaleDropdown() {
	const pathName = usePathname()
	const router = useRouter()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost">
					<LanguagesIcon className="h-6 w-6" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{locales.map((locale) => (
					<DropdownMenuItem
						key={locale.lang}
						className="hover:cursor-pointer"
						onClick={() => router.push(`/${locale.lang}${pathName}`)}>
						{locale.name}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
