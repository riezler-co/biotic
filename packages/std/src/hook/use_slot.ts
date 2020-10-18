import { useMemo, Children } from 'react'

type Slots = JSX.Element | Array<JSX.Element>

export function useSlots(children: Slots, DefaultSlots = {}) {
	return useMemo(
		() => Children.map(children, toSlot).reduce(toObject, DefaultSlots),
		[children]
	)
}


type Props =
	{ [key:string]: JSX.Element }

function toSlot(child: JSX.Element): Props {
	return { [child.props.slot.toUpperCase()]: child }
}

function toObject (acc: Props, x: Props) {
	return Object.assign({}, acc, x)
}