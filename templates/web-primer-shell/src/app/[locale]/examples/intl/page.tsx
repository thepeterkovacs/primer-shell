"use client"

import { useTranslations } from "next-intl"

export default function IntlPage() {
	const t = useTranslations("pages.intl")

	return (
		<main className="flex h-screen items-center justify-center">
			<h1 className="text-3xl">language: {t("language")}</h1>
		</main>
	)
}
