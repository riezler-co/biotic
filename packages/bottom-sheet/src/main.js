import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { useGetContainer
			 , usePreventScroll
			 , useOnEscape
			 , useWindowSize
			 , useResizeObserver
			 } from '@biotic-ui/std'
import { useSpring, animated } from 'react-spring'
import { Backdrop } from '@biotic-ui/leptons'

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
	z-index: var(--bottom-sheet-z-index, 9999);
	
	${p => p.height ? `height: ${p.height}px`: ''};
	${p => p.open && 'box-shadow: var(--bottom-sheet-shadow, var(--bottom-default-sheet-shadow));'}

	--menu-box-shadow: none;
	--menu-width: auto;
	--menu-padding: 1em;
	--menu-max-width: 100%;
	--menu-border: none;
`

export let BottomSheet = ({
	children,
	open = false,
	onClose = () => {},
	height = null,
	minHeight = 0,
	scrollable = false,
	className,
	onClick
}) => {

	let SheetContainer = useGetContainer('biotic-bottom-drawer-container')

	let [sheet, setSheet] = useState({
		height: 0,
	})

	let { innerHeight = 0 } = useWindowSize()

	let [openUntil, setOpenUntil] = useState(0)
	useEffect(() => {
		let _height = height === null ? 1 : height
		setOpenUntil(innerHeight * _height)
	}, [height, innerHeight])

	let sheetHeight = getSheetHeight({
		height,
		innerHeight,
		sheet,
		minHeight,
		openUntil
	})

	let translateY = sheetHeight === 0
		// trying to hide the bottom sheet until get a container
		// without causing an animation
		? '99999px'
		: `${sheetHeight}px`

	let props = useSpring({
		transform: open ? 'translateY(0)' : `translateY(${translateY})`
	})

	let wrapperAnimation = useSpring({
		opacity: open ? 1 : 0
	})

	useOnEscape(() => open && onClose({ backdrop: false, escape: true }))
	usePreventScroll(open && !scrollable)

	function handleBackdrop() {
		onClose && onClose({ backdrop: true, escape: false })
	}

	let sheetRef = useResizeObserver(entries => {
		let ids = entries.map(entry => {
			if (!entry.contentRect) return
			return requestAnimationFrame(() => {
				let { height } = entry.contentRect
				setSheet({ height })
			})
		})

		return () => {
			ids
				.filter(id => id !== undefined)
				.forEach(cancelAnimationFrame)
		}
	})

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
				>
				<div ref={sheetRef}>
					{ children }
				</div>
			</BottomDrawer>
			
		</React.Fragment>
	)

	return SheetContainer ? createPortal(Sheet, SheetContainer) : null
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

function getSheetHeight({ height, innerHeight, minHeight, sheet, openUntil }) {

	if (height === 1) {
		return innerHeight
	}

	if (height !== null) {
		return Math.min(sheet.height, openUntil)
	}

	return innerHeight * minHeight
}