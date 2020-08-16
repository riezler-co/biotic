

export { useCombinedRefs } from './hook/use_combined_refs'
export { useLongPress } from './hook/use_long_press'
export { useOnEscape } from './hook/use_on_escape'
export { usePreventScroll } from './hook/use_prevent_scroll'
export { useScroll } from './hook/use_scroll'
export { useScrollShadow, SHADOWS } from './hook/use_scroll_shadow'
export { useMatchMedia } from './hook/use_match_media'

export function getContainer (id) {
	let container = document.querySelector(`#${id}`)

	if (container === null) {
		let container = document.createElement('div')
		container.id = id
		document.body.appendChild(container)
		return container
	}

	return container
}