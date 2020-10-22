
export type Rect =
	{ width: number
	; height: number
	; top: number
	; left: number
	}

export function getSubmenuPosition(
		submenuRect: Rect
	, menuRect: Rect
) {
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