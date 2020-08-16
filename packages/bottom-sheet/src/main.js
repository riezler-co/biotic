import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { getContainer, usePreventScroll, useOnEscape } from '@riezler/react-utils'
import { useSpring, animated } from 'react-spring'
import { Backdrop } from '@biotic-ui/leptons'

let SheetContainer = getContainer('biotic-bottom-drawer-container')

let BottomDrawer = styled.div`
	--bottom-default-sheet-shadow: 0px 8px 21px -5px rgba(0, 0, 0, 0.5);
	position: fixed;
	bottom: 0;
	left: 0;
	background: var(--mui-bottom-sheet-bg, #fff);
	border-top-left-radius: var(--bottom-sheet-border-radius, 1em);
	border-top-right-radius: var(--bottom-sheet-border-radius, 1em);
	width: 100%;
	max-height: 100vh;
	overflow-y: auto;
	z-index: 11;
	
	${p => p.height ? `height: ${p.height}px`: ''};
	${p => p.open && 'box-shadow: var(--bottom-sheet-shadow, var(--bottom-default-sheet-shadow));'}

	--menu-box-shadow: none;
	--menu-width: auto;
	--menu-padding: 1em;
`

export let BottomSheet = ({
	children,
	open = false,
	onClose = () => {},
	height = null,
	scrollable = false,
	className,
	onClick
}) => {

	let [sheet, setSheet] = useState({
		height: 0,
	})

	let sheetRef = useRef(null)
	useLayoutEffect(() => {
		if (sheetRef.current) {
			let { height } = sheetRef.current.getBoundingClientRect()
			setSheet({ height })
		}
	}, [sheetRef])

	let [openUntil, setOpenUntil] = React.useState(window.innerHeight)
	useEffect(() => {
		let _height = height === null ? 1 : height
		setOpenUntil(window.innerHeight * _height)
	}, [height])

	let sheetHeight = height === 1
		? window.innerHeight
		: height === null ? Math.min(sheet.height, openUntil) : openUntil

	let props = useSpring({
		transform: open ? 'translateY(0)' : `translateY(${sheetHeight}px)`
	})

	let wrapperAnimation = useSpring({
		opacity: open ? 1 : 0
	})

	useOnEscape(() => open && onClose({ backdrop: false, escape: true }))
	usePreventScroll(open && !scrollable)

	function handleBackdrop() {
		onClose && onClose({ backdrop: true, escape: false })
	}

	let Sheet = (
		<React.Fragment>
			
			{
				!scrollable &&
				<Backdrop as={animated.div}
								  style={wrapperAnimation}
								  open={open}
								  onClick={handleBackdrop} />
			}

			<BottomDrawer
				onClick={onClick}
				as={animated.div}
				style={props}
				className={className}
				open={open}
				height={sheetHeight}
				ref={sheetRef}>
				{ children }
			</BottomDrawer>
			
		</React.Fragment>
	)

	return ReactDOM.createPortal(Sheet, SheetContainer)
}


export let SheetHeader = styled.header`
	border-bottom: 1px solid var(--mui-bottom-sheet-background, rgba(0,0,0, 0.25));
	padding: 1.38em;
`

export let SheetTitle = styled.h3`
	margin: 0;
`

export let SheetContent = styled.div`
	padding: 0 1.38em;
`