
export let ellipsis = `
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`

export let clamp = (lines: number) => {
	return `
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: ${lines};
		overflow: hidden;
	`
}