import React, { Children, useState, SyntheticEvent } from 'react'
import { createPortal } from 'react-dom'
import { useGetContainer, useOnEscape, useOutsideClick, useCombinedRefs } from '@biotic-ui/std'
import { usePopper } from 'react-popper'
import { Placement } from '@popperjs/core'

type Config = {
	placement?: Placement
}

let DefaultConfig: Config = {
	placement: 'bottom' as Placement,
}

type ContainerProps = {
	children: JSX.Element
}

type UseMenu = {
	ref: (e: HTMLElement | null) => void ;
	onClick: (e: MouseEvent) => void;
	MenuContainer: React.FC<ContainerProps>;
}

export function useMenu(userConfig: Config = DefaultConfig): UseMenu {
	let MENU_CONTAINER = useGetContainer('biotic-menu')
	let [show, setShow] = useState(false)
	let [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)
	let config = { ...DefaultConfig, ...userConfig }

	let MenuContainer = ({ children: menu }: ContainerProps) => {
		let [popperElement, setPopperElement] = useState<HTMLElement | null>(null)
		let { styles, attributes } = usePopper(referenceElement, popperElement, {
			...config,
			modifiers: [
				{
				  name: 'offset',
				  options: {
				    offset: [0, 8],
				  },
				},
			],
		})

		let close = () => setShow(false)
		let outsideRef = useOutsideClick<HTMLElement>(close)
		let mainRef = useCombinedRefs<HTMLElement | null>(outsideRef, setPopperElement)
		useOnEscape(close)

		if (!show) {
			return null
		}

		let Menu = React.cloneElement(menu, {
			children: Children.map(menu.props.children, node => {
				return React.cloneElement(node, {
					onClick: async (e: SyntheticEvent) => {
						let userChoice = node.props.onClick
							? node.props.onClick(e)
							: true

						let shouldClose = await Promise.resolve(userChoice)

						if (shouldClose === false) {
							return
						}

						close()
					}
				})
			}) 
		})

		let PopperMenu = (
			<div ref={mainRef} style={{ ...styles.popper, zIndex: 9999 }} {...attributes.popper}>					
				{ Menu }
			</div>
		)

		return MENU_CONTAINER ? createPortal(PopperMenu, MENU_CONTAINER) : null
	}

	let onClick = (e: MouseEvent) => {
		// we stop propagation here otherwise
		// useOutsideClick will regiser a click
		// event and immediately close the menu.
		e.stopPropagation()
		setShow(true)
	}

	return {
		ref: setReferenceElement,
		onClick: onClick,
		MenuContainer
	}
}