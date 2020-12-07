import React, { Children, useState, ReactElement } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import { useGetContainer, useOnEscape } from '@biotic-ui/std'
import { createPortal } from 'react-dom'
import { usePopper } from 'react-popper'
import { Placement } from '@popperjs/core'
import { Menu } from './menu'

type Config =
	{ placement?: Placement
	}

let DefaultConfig: Config = {
	placement: 'bottom' as Placement,
}

type ContainerProps =
	{ children: JSX.Element
	}

type UseMenu =
	{ ref: (e: HTMLElement | null) => void 
	;	onClick: (e: MouseEvent) => void
	;	MenuContainer: React.FC<ContainerProps>
	}

export function useMenu(userConfig: Config = DefaultConfig): UseMenu {
	let MENU_CONTAINER = useGetContainer('biotic-menu')
	let [show, setShow] = useState(false)
	let [referenceElement, setReferenceElement] = useState<HTMLElement | null>(null)
	let config = { ...DefaultConfig, ...userConfig }

	useOnEscape(() => setShow(false))

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

		if (!show) {
			return null
		}

		let Menu = React.cloneElement(menu, {
			children: Children.map(menu.props.children, node => {
				return React.cloneElement(node, {
					onClick: async e => {
						let userChoice = node.props.onClick
							? node.props.onClick(e)
							: true

						let shouldClose = await Promise.resolve(userChoice)

						if (shouldClose === false) {
							return
						}

						setShow(false)
					}
				})
			}) 
		})

		let PopperMenu = (
			<OutsideClickHandler onOutsideClick={() => setShow(false)}>
				<div ref={setPopperElement} style={{ ...styles.popper, zIndex: 9999 }} {...attributes.popper}>
					{ Menu }
				</div>
			</OutsideClickHandler>
		)

		return MENU_CONTAINER ? createPortal(PopperMenu, MENU_CONTAINER) : null
	}

	let onClick = () => {
		setShow(true)
	}

	return {
		ref: setReferenceElement,
		onClick: onClick,
		MenuContainer
	}
}