
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