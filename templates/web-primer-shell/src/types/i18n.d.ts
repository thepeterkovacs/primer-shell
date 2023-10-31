type Messages = typeof import("../lib/i18n/messages/en.json")
declare interface IntlMessages extends Messages {}

type Locale = {
	name: string
	lang: string
}
