import React, { Children, useState } from 'react'
import OutsideClickHandler from 'react-outside-click-handler'
import { getContainer } from '@riezler/react-utils'
import { createPortal } from 'react-dom'
import { usePopper } from 'react-popper'
import { Menu } from './menu'

let MENU_CONTAINER = getContainer('biotic-menu')

let DefaultConfig = {
	placement: 'bottom-end'
}

export function useMenu(userConfig = {}) {
	let [show, setShow] = useState(false)
	let [referenceElement, setReferenceElement] = useState(null)
	let config = { ...DefaultConfig, ...userConfig }

	let MenuContainer = ({ children: menu }) => {
		let [popperElement, setPopperElement] = useState(null)
		let { styles, attributes } = usePopper(referenceElement, popperElement, config)

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
				<div ref={setPopperElement} style={styles.popper} {...attributes.popper}>
					{ Menu }
				</div>
			</OutsideClickHandler>
		)

		return createPortal(PopperMenu, MENU_CONTAINER)
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