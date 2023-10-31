"use client"

import { useTranslations } from "next-intl"

import LocaleDropdown from "@/components/tools/LocaleDropdown"

export default function IntlPage() {
	const t = useTranslations("pages.intl")

	return (
		<main className="flex h-screen items-center justify-center gap-2">
			<LocaleDropdown />
			<h1 className="text-3xl">language: {t("language")}</h1>
		</main>
	)
}
