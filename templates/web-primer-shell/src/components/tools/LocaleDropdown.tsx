"use client"

import { GlobeIcon } from "@radix-ui/react-icons"

import { usePathname, useRouter } from "next/navigation"

import { locales } from "@/lib/i18n/config"

import { Button } from "../layout/Button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../layout/DropdownMenu"

export default function LocaleDropdown() {
	const pathName = usePathname()
	const router = useRouter()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="sm">
					<GlobeIcon className="h-5 w-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{locales.map((locale) => (
					<DropdownMenuItem
						key={locale.lang}
						onClick={() => router.push(`/${locale.lang}${pathName}`)}>
						{locale.name}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
