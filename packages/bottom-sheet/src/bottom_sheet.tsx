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

import { Backdrop } from '@biotic-ui/leptons'
import { motion, AnimatePresence, useMotionValue } from 'framer-motion'

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

export let BottomSheet = (
	{ children
	, open = false
	, onClose = () => {}
	, height = null
	, minHeight = 0
	, scrollable = false
	, className
	, onClick
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

	useOnEscape(() => open && onClose({ backdrop: false, escape: true }))
	usePreventScroll(open && !scrollable)

	function handleBackdrop() {
		onClose && onClose({ backdrop: true, escape: false })
	}

	let contentRef = useResizeObserver(entries => {
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

	let backdropVariants =
		{ hidden:
				{ opacity: 0 }

		, visible:
				{ opacity: 1 }
		}
		
	let spring =
		{ type: 'spring'
		, damping: 21
		, stiffness: 130
		}

	let transform = useMotionValue(0)

	let Sheet = (
		<React.Fragment>
			
			{
				!scrollable &&
				<Backdrop as={motion.div}
									open={open}
									initial='hidden'
									animate={open ? 'visible' : 'hidden'}
									variants={backdropVariants}
									onClick={handleBackdrop}
				/>
			}

			<AnimatePresence>
				{ open &&
						<BottomDrawer
							as={motion.div}
							onClick={onClick}
							className={className}
							open={open}
							initial={{ transform: 'translateY(100%)' }}
							animate={{ transform: 'translateY(0%)' }}
							exit={{ transform: 'translateY(100%)' }}
							height={sheetHeight}
							transition={spring}
						>
							<motion.div ref={contentRef}>
								{ children }
							</motion.div>
						</BottomDrawer>
				}
			</AnimatePresence>
			
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