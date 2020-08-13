
export function getContextMenuPostion(boundingClientRect, mousePosition) {
	let { width, height } = boundingClientRect
	let { innerHeight, innerWidth, pageXOffset, pageYOffset } = window

	let mouseY = mousePosition.y - pageYOffset
	let mouseX = mousePosition.x - pageXOffset

	let left = fits(mouseX, innerWidth, width)
		? mouseX + width > innerWidth
			? `${mousePosition.x - width}px`
			: `${mousePosition.x}px`

		: `calc(${pageXOffset}px + 5px)`
		

	let top = fits(mouseY, innerHeight, height)
		? mouseY + height > innerHeight
			? `${mousePosition.y - height}px`
			: `${mousePosition.y}px`
		: `calc(${pageYOffset}px + 5px)`

	
	return { top, left }
}


function fits(mouse, inner, menu) {
	let x = mouse
	let y = inner - mouse

	if (x < menu && y < menu) {
		return false
	}

	return true
}