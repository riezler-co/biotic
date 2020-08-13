import React, { useState, useEffect, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { getContextMenuPostion } from './utils'
import { getContainer, useLongPress } from '@riezler/react-utils'
import styled from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler'
import { BottomSheet } from '@biotic-ui/bottom-sheet'

let Nav = ({ position, onClose, children }) => {
	
	let [ref, setRef] = useState(null)
	useEffect(() => {
		let handleScroll = (e) => {
			let isMenu = e.path.find(node => node === ref)
			
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
		let { top, left, fits } = getContextMenuPostion(boundingClientRect, position)
		node.style.top = top
		node.style.left = left
	}, [ref, position])

	return React.cloneElement(children, {
		style: { position: 'absolute' },
		ref: setRef,
		onClick: onClose
	})
}

let Container = getContainer('biotic-context-menu')

export function useContextMenu() {
	let [useConextMenu, setUseContextMenu] = useState(false)
	let [useBottomSheet, setUseBottomSheet] = useState(false)
	let [position, setPosition] = useState({ x: 0, y: 0 })
	
	function onContextMenu(e) {
		e.preventDefault()
		setPosition({ x: e.pageX, y: e.pageY })
		setUseContextMenu(true)
	}

	let longPress = useLongPress(function onLongPress() {
		setUseBottomSheet(true)
	})

	let ContextMenu = ({ children }) => {

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

		return createPortal(Menu, Container)
	}

	return { onContextMenu, ContextMenu, ...longPress }
}

