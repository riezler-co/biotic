

export { useCombinedRefs } from './hook/use_combined_refs'
export { useLongPress } from './hook/use_long_press'

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