import path from "path"
import { fileURLToPath } from "url"

/** Name of the application. */
export const APP_NAME: string = "Primer Shell"

/** Path to the root folder of the application. */
export const ROOT_PATH: string = path.join(path.dirname(fileURLToPath(import.meta.url)), "../")
