import { Dispatch, useEffect, useState } from "react"

/**
 * Manages a state in the session storage.
 * @param {string} key Key to be used for storing and retrieving data from the session storage.
 * @param {any} defaultValue Default value to be used if the key does not exist in the session storage.
 * @returns {[any, Dispatch<any>]} A tuple containing the current value stored in the session storage and a function to update it.
 * @example
 * const [data, setData] = useSessionStorage("data", 0)
 */
const useSessionStorage = (key: string, defaultValue: any): [any, Dispatch<any>] => {
	const [sessionItem, setSessionItem] = useState<[any, Dispatch<any>]>()

	useEffect(() => {
		setSessionItem(() => {
			const item = sessionStorage.getItem(key)
			return item ? JSON.parse(item) : defaultValue
		})
	}, [key, defaultValue])

	useEffect(() => {
		sessionStorage.setItem(key, JSON.stringify(sessionItem))
	}, [key, sessionItem])

	return [sessionItem, setSessionItem]
}

export default useSessionStorage
