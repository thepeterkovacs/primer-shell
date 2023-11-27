import { LRUCache } from "lru-cache"

import T from "classes/T"

export type Options = LRUCache<{}, {}, unknown> | LRUCache.Options<{}, {}, unknown>
export type Check = (limit: number, token: string) => Promise<void>

/**
 * Creates a rate limiter using LRUCache.
 * @param {Options} options LRUCache options.
 * @returns {{ check: Check }} An object with a `check()` function that checks if a request is allowed under the rate limit.
 * @example
 * const apiRateLimit = rateLimit()
 * await apiRateLimit.check(100, "API_RATE_LIMIT_TOKEN")
 */
export const rateLimit = (options?: Options): { check: Check } => {
	const cache = new LRUCache({
		max: options?.max || 10,
		ttl: options?.ttl || new T().m(1).toMs(),
	})

	return {
		check: (limit: number, token: string): Promise<void> =>
			new Promise<void>((resolve, reject) => {
				const count = (cache.get(token) as number[]) || [0]
				let currentUsage = count[0]

				if (currentUsage === 0) {
					cache.set(token, count)
				}

				currentUsage += 1

				return currentUsage > limit ? reject() : resolve()
			}),
	}
}
