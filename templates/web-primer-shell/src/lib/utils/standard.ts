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
 * Retrieves the public URL of the application using the `NEXT_PUBLIC_URL` environment variable.
 * @returns {string} Public URL of the application.
 * @example
 * const appUrl = getAppUrl();
 */
export const getAppUrl = (): string => process.env.NEXT_PUBLIC_URL

/**
 * Retrieves the tRPC API URL of the application.
 * @returns {string} tRPC URL of the application.
 * @example
 * const trpcUrl = getTrpcUrl();
 */
export const getTrpcUrl = (): string => `${process.env.NEXT_PUBLIC_URL}/api/trpc`

/**
 * Checks if the application is running in development environment.
 * @returns {boolean} `true` if the environment is development, `false` otherwise.
 * @example
 * if (isDevEnv()) console.log("development")
 */
export const isDevEnv = (): boolean => process.env.NODE_ENV === "development"

/**
 * Checks if the application is running in production environment.
 * @returns {boolean} `true` if the environment is production, `false` otherwise.
 * @example
 * if (isProdEnv()) console.log("production")
 */
export const isProdEnv = (): boolean => process.env.NODE_ENV === "production"

/**
 * Delays the execution by a specified number of milliseconds.
 * @async
 * @param {number} ms Number of milliseconds to wait.
 * @returns {Promise<void>} A Promise that resolves after the specified delay.
 * @example
 * await wait(1000);
 */
export const wait = async (ms: number): Promise<void> =>
	await new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Fetches the HTML content from a specified URL.
 * @async
 * @param {string} url The URL from which to fetch HTML content.
 * @returns {Promise<string>} A Promise that resolves with the fetched HTML content as a string.
 * @example
 * const html = await getHtmlFromUrl("https://nextjs.org")
 */
export const getHtmlFromUrl = async (url: string): Promise<string> => {
	const res = await fetch(url, { cache: "no-store" })
	return await res.text()
}
