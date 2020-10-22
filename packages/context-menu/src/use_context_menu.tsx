import React from 'react'
import { useState
			 , useEffect
			 , useLayoutEffect
			 , ReactElement
			 , MouseEvent
			 } from 'react'
import { createPortal } from 'react-dom'
import { getContextMenuPostion } from './utils'
import type { Position } from './utils'
import { useGetContainer, useLongPress, useOnEscape } from '@biotic-ui/std'
import styled from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler'
import { BottomSheet } from '@biotic-ui/bottom-sheet'

type NavProps =
	{ position: Position
	; onClose: () => void
	}

let Nav: React.FC<NavProps> = ({ position, onClose, children }) => {
	
	let [ref, setRef] = useState<HTMLElement | null>(null)
	useEffect(() => {
		let handleScroll = (e: WheelEvent) => {
			let path = e.composedPath()
			let isMenu = path.find(node => node === ref)
			
			if (isMenu === undefined) {
				onClose && onClose()
			}

		}
		window.addEventListener('wheel', handleScroll)
		return () => {
			window.removeEventListener('wheel', handleScroll)
		}
	}, [ref])

	useLayoutEffect(() => {
		if (!ref) return
		let node = ref
		let boundingClientRect = node.getBoundingClientRect()
		let { top, left } = getContextMenuPostion(boundingClientRect, position)
		node.style.top = top
		node.style.left = left
	}, [ref, position])

	useOnEscape(onClose)

	let child = React.Children.only(children) as ReactElement
	return React.cloneElement(child, {
		style: { position: 'absolute', zIndex: 9999 },
		ref: setRef,
		onClick: onClose
	})
}

let DefaultOptions = {
	delay: 1000
}

type ContextMenuProps =
	{ children: JSX.Element
	}

export function useContextMenu(userOptions = {}) {
	let options = { ...DefaultOptions, ...userOptions }
	let Container = useGetContainer('biotic-context-menu')
	let [useConextMenu, setUseContextMenu] = useState(false)
	let [useBottomSheet, setUseBottomSheet] = useState(false)
	let [position, setPosition] = useState({ x: 0, y: 0 })
	
	function onContextMenu(e: MouseEvent) {
		e.preventDefault()
		setPosition({ x: e.pageX, y: e.pageY })
		setUseContextMenu(true)
	}

	let longPress = useLongPress(
		() => setUseBottomSheet(true),
		{ shouldPreventDefault: false, delay: options.delay }
	)

	let ContextMenu = ({ children }: ContextMenuProps) => {

	  if (!useConextMenu && !useBottomSheet) {
	  	return null
	  }

	  if (useBottomSheet) {
	  	let menu = React.cloneElement(children, {
	  		replace: true
	  	})

	  	return (
	  		<BottomSheet open
	  			      		 onClose={() => setUseBottomSheet(false)}
	  			      		 onClick={() => setUseBottomSheet(false)}>
	  			{ menu }
	  		</BottomSheet>
	  	)
	  }

		let Menu = (
			<OutsideClickHandler onOutsideClick={() => setUseContextMenu(false)}>
				<Nav onClose={() => setUseContextMenu(false)} position={position}>
					{ children }
				</Nav>
			</OutsideClickHandler>
		)

		return Container ? createPortal(Menu, Container) : null
	}

	return { onContextMenu, ContextMenu, ...longPress }
}

