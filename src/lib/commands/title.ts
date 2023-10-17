import figlet from "figlet"
import gradient from "gradient-string"

import logError from "../utils/error.js"

/**
 * Asynchronously generates and displays a styled title using the Figlet library.
 * @param {string} title Text to be styled and displayed as a title.
 * @param {figlet.Fonts} font Figlet font to be used for styling the title.
 * @returns {Promise<void>} A Promise that resolves once the title is displayed.
 * @example
 * await showTitle("Title", "Doom")
 */
export default async function showTitle(title: string, font: figlet.Fonts): Promise<void> {
	return new Promise<void>(function (resolve) {
		figlet.text(title, { font }, function (err, data) {
			if (err) {
				logError("Error while showing title", err)
			}

			console.log(gradient.vice(data))

			return resolve()
		})
	})
}
