/**
 * A class for representing and calculating time in days, hours, minutes, seconds, and milliseconds.
 */
export default class T {
	private days: number
	private hours: number
	private minutes: number
	private seconds: number
	private milliseconds: number

	constructor(
		days?: number,
		hours?: number,
		minutes?: number,
		seconds?: number,
		milliseconds?: number,
	) {
		this.days = days ?? 0
		this.hours = hours ?? 0
		this.minutes = minutes ?? 0
		this.seconds = seconds ?? 0
		this.milliseconds = milliseconds ?? 0
	}

	/**
	 * Sets the number of days.
	 * @param {number} days Number of days.
	 * @returns The current `T` object.
	 */
	d(days: number): T {
		this.days = days
		return this
	}

	/**
	 * Sets the number of hours.
	 * @param {number} hours Number of hours.
	 * @returns The current `T` object.
	 */
	h(hours: number): T {
		this.hours = hours
		return this
	}

	/**
	 * Sets the number of minutes.
	 * @param {number} minutes Number of minutes.
	 * @returns The current `T` object.
	 */
	m(minutes: number): T {
		this.minutes = minutes
		return this
	}

	/**
	 * Sets the number of seconds.
	 * @param {number} seconds Number of seconds.
	 * @returns The current `T` object.
	 */
	s(seconds: number): T {
		this.seconds = seconds
		return this
	}

	/**
	 * Sets the number of milliseconds.
	 * @param {number} milliseconds Number of milliseconds.
	 * @returns The current `T` object.
	 */
	ms(milliseconds: number): T {
		this.milliseconds = milliseconds
		return this
	}

	/**
	 * Calculates the number of days from the `T` object.
	 * @returns The number of days.
	 */
	toD(): number {
		return (
			this.days +
			this.hours / 24 +
			this.minutes / 60 / 24 +
			this.seconds / 60 / 60 / 24 +
			this.milliseconds / 1000 / 60 / 60 / 24
		)
	}

	/**
	 * Calculates the number of hours from the `T` object.
	 * @returns The number of hours.
	 */
	toH(): number {
		return (
			this.days * 24 +
			this.hours +
			this.minutes / 60 +
			this.seconds / 60 / 60 +
			this.milliseconds / 1000 / 60 / 60
		)
	}

	/**
	 * Calculates the number of minutes from the `T` object.
	 * @returns The number of minutes.
	 */
	toM(): number {
		return (
			this.days * 24 * 60 +
			this.hours * 60 +
			this.minutes +
			this.seconds / 60 +
			this.milliseconds / 1000 / 60
		)
	}

	/**
	 * Calculates the number of seconds from the `T` object.
	 * @returns The number of seconds.
	 */
	toS(): number {
		return (
			this.days * 24 * 60 * 60 +
			this.hours * 60 * 60 +
			this.minutes * 60 +
			this.seconds +
			this.milliseconds / 1000
		)
	}

	/**
	 * Calculates the number of milliseconds from the `T` object.
	 * @returns The number of milliseconds.
	 */
	toMs(): number {
		return (
			this.days * 24 * 60 * 60 * 1000 +
			this.hours * 60 * 60 * 1000 +
			this.minutes * 60 * 1000 +
			this.seconds * 1000 +
			this.milliseconds
		)
	}
}
