
const KEY = 'biotic:migrations'

export type Migration =  {
	version: number;
	migrate: (currentValue: unknown) => unknown;
}

type Entry = {
	version: number;
	indicies: Array<string>;
}

type Entries = {
	[table: string]: Entry;
}

let cached: { value: Entries | null } = {
	value: null
}

export let Migrations = {
	set(entries: Entries) {
		cached.value = entries
		localStorage.setItem(KEY, JSON.stringify(entries))
	},


	get(): Entries {
		if (cached.value !== null) {
			return cached.value
		}

		let value = localStorage.getItem(KEY)
			
		if (value === null) {
			return {}
		}

		let entries = JSON.parse(value)
		cached.value = entries

		return entries
	},
}