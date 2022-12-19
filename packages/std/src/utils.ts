
export function cx(...args: Array<string | { [prop: string]: boolean }>): string {
	let classes = args.filter(str => typeof str === 'string')
	let objects = args.filter(obj => typeof obj === 'object')

	let objectProps = objects.flatMap(obj => {
		return Object.entries(obj)
			.filter(entry => entry[1])
			.map(entry => entry[0])
	})

	return `${classes.join(' ')} ${objectProps.join(' ')}`
}

export function uuid(): string {
	if ('randomUUID' in self.crypto) {
		return self.crypto.randomUUID()
	}

	// https://stackoverflow.com/a/2117523/11383840
	// @ts-ignore
	return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, (c) => (c ^ self.crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}
