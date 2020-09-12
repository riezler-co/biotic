import { useMemo, Children } from 'react'

export function useSlots(children, DefaultSlots = {}) {
	return useMemo(
		() => Children.map(children, toSlot).reduce(toObject, DefaultSlots),
		[children]
	)
}

function toSlot(child) {
	return { [child.props.slot.toUpperCase()]: child }
}

function toObject (acc, x) {
	return Object.assign({}, acc, x)
}