import { Dispatch, useEffect, useState } from "react"

/**
 * Manages a state in the local storage.
 * @param {string} key Key to be used for storing and retrieving data from the local storage.
 * @param {any} defaultValue Default value to be used if the key does not exist in the local storage.
 * @returns {[any, Dispatch<any>]} A tuple containing the current value stored in the local storage and a function to update it.
 * @example
 * const [data, setData] = useLocalStorage("data", 0)
 */
const useLocalStorage = (key: string, defaultValue: any): [any, Dispatch<any>] => {
	const [localItem, setLocalItem] = useState<[any, Dispatch<any>]>()

	useEffect(() => {
		setLocalItem(() => {
			const item = localStorage.getItem(key)
			return item ? JSON.parse(item) : defaultValue
		})
	}, [key, defaultValue])

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(localItem))
	}, [key, localItem])

	return [localItem, setLocalItem]
}

export default useLocalStorage
