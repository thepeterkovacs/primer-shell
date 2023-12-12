/** @type {import('prettier').Config} */
export default {
	arrowParens: "always",
	bracketSameLine: true,
	bracketSpacing: true,
	endOfLine: "crlf",
	importOrder: ["^~/(.*)$", "^[./]"],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	plugins: ["@trivago/prettier-plugin-sort-imports"],
	printWidth: 100,
	semi: false,
	singleQuote: false,
	tabWidth: 4,
	trailingComma: "es5",
	useTabs: true,
}
