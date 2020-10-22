import React from 'react'

import { useEffect
			 , useState
			 , useRef
			 , useLayoutEffect 
			 , MouseEvent
			 } from 'react'

import { createPortal } from 'react-dom'
import { useGetContainer
			 , usePreventScroll
			 , useOnEscape
			 , useWindowSize
			 , useResizeObserver
			 } from '@biotic-ui/std'
import { useSpring, animated } from 'react-spring'
import { Backdrop } from '@biotic-ui/leptons'

import { BottomDrawer } from './styled'

type CloseEvent =
	{ backdrop: boolean
	; escape: boolean
	}

type Props =
	{ children?: JSX.Element | Array<JSX.Element>
	; open?: boolean
	; onClose?: (e: CloseEvent) => void
	; height?: number | null
	; minHeight?: number
	; scrollable?: boolean
	; className?: string
	; onClick?: (e: MouseEvent) => void
	}

export let BottomSheet = ({
	children,
	open = false,
	onClose = () => {},
	height = null,
	minHeight = 0,
	scrollable = false,
	className,
	onClick
}: Props) => {

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
			ids.forEach(id => {
				if (id !== undefined) {
					cancelAnimationFrame(id)
				}
			})
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

type GetSheetHeight =
	{ height: number | null
	; innerHeight: number
	; minHeight: number
	; sheet: { height: number }
	; openUntil: number
	}

function getSheetHeight(
	{ height
	, innerHeight
	, minHeight
	, sheet
	, openUntil
}: GetSheetHeight) {

	if (height === 1) {
		return innerHeight
	}

	if (height !== null) {
		return Math.min(sheet.height, openUntil)
	}

	return innerHeight * minHeight
}