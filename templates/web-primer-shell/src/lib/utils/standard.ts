import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class values into a single class name string using tailwindcss utilities.
 * @param {...ClassValue[]} inputs Class values to be combined.
 * @returns {string} The combined class name string.
 * @example
 * const classes = cn("text-red-500", { "bg-blue-200": false }, { "font-bold": true }, "py-2")
 * //classes = "text-red-500 font-bold py-2"
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs))

/**
 * Fetches the HTML content from a specified URL.
 * @param {string} url The URL from which to fetch HTML content.
 * @returns {Promise<string>} A Promise that resolves with the fetched HTML content as a string.
 * @example
 * const html = await getHtmlFromUrl("https://nextjs.org")
 */
export const getHtmlFromUrl = async (url: string): Promise<string> => {
	const res = await fetch(url, { cache: "no-store" })
	return await res.text()
}

/**
 * Extracts a substring from a string, given a prefix and suffix.
 * @param {string} str The string to extract the substring from.
 * @param {string} prefix Prefix of the substring to extract.
 * @param {string} suffix Suffix of the substring to extract.
 * @returns {string} The substring extracted from the string, or an empty string if the substring could not be found.
 * @example
 * const extracted = extractSubstring("Some string as str.", "Some ", " as str.")
 * //extracted = "string"
 */
export const extractSubstring = (str: string, prefix: string, suffix: string): string => {
	const startIndex = str.indexOf(prefix)
	const endIndex = str.indexOf(suffix)

	const subString = str.slice(startIndex + prefix.length, endIndex)

	return subString
}
