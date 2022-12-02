
export function getLength(value?: number | string): string {
	if (value === undefined) {
		return ''
	}

	return typeof value === 'string' ? value : `${value}px`
}