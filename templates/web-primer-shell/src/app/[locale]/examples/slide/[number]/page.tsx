"use client"

import { useEffect } from "react"

import { useRouter } from "next/navigation"

import T from "@/lib/classes/T"

const options = {
	numberOfSlides: 5,
	intervalInMs: new T().s(3).toMs(),
}

interface Props {
	params: {
		number: string
	}
}

export default function SlidePage({ params }: Props) {
	const { number } = params

	const currentNumber = parseInt(number)

	const router = useRouter()

	const nextNumber = currentNumber == options.numberOfSlides ? 1 : currentNumber + 1
	const previousNumber = currentNumber == 1 ? options.numberOfSlides : currentNumber - 1

	useEffect(() => {
		const handleRightArrow = (event: KeyboardEvent) => {
			if (event.key === "ArrowRight") {
				router.push(`/templates/slide/${nextNumber}`)
			}
		}

		const handleLeftArrow = (event: KeyboardEvent) => {
			if (event.key === "ArrowLeft") {
				router.push(`/templates/slide/${previousNumber}`)
			}
		}

		document.addEventListener("keydown", handleRightArrow)
		document.addEventListener("keydown", handleLeftArrow)

		return () => {
			document.removeEventListener("keydown", handleRightArrow)
			document.removeEventListener("keydown", handleLeftArrow)
		}
	}, [])

	useEffect(() => {
		const intervalId = setInterval(
			() => router.push(`/templates/slide/${nextNumber}`),
			options.intervalInMs
		)

		return () => clearInterval(intervalId)
	}, [])

	return (
		<main className="flex h-screen items-center justify-center">
			<h1 className="text-3xl">slide number: {currentNumber}</h1>
		</main>
	)
}
