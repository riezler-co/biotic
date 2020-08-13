
export function getSubmenuPosition(submenuRect, menuRect) {
	let { innerHeight, innerWidth, pageXOffset, pageYOffset } = window
	let menuTop = menuRect.top
	let menuLeft = menuRect.left + menuRect.width

	let left = menuLeft + submenuRect.width + 20 > innerWidth
		? '-100%'
		: '100%'

	let top = menuTop + submenuRect.height + 20 > innerHeight
		? `-${submenuRect.height - menuRect.height}px`
		: '0'

	return { left, top }
}