/** @type {import('prettier').Config} */
module.exports = {
	arrowParens: "always",
	bracketSameLine: true,
	bracketSpacing: true,
	endOfLine: "crlf",
	importOrder: ["^~/(.*)$", "^server/(.*)$", "^service/(.*)$"],
	importOrderSeparation: true,
	importOrderSortSpecifiers: true,
	plugins: ["@trivago/prettier-plugin-sort-imports"],
	printWidth: 100,
	semi: false,
	singleQuote: false,
	tabWidth: 4,
	trailingComma: "all",
	useTabs: true,
}
