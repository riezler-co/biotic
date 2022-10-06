import { Children, cloneElement, ReactNode } from 'react'
import {
	useState,
	useEffect,
	useLayoutEffect,
	ReactElement,
	MouseEvent,
	forwardRef,
} from 'react'
import { createPortal } from 'react-dom'
import { getContextMenuPostion } from './utils'
import type { Position } from './utils'
import {
	useGetContainer,
	useLongPress,
	useOnEscape,
	useOutsideClick,
	useCombinedRefs,
} from '@biotic-ui/std'
import { BottomSheet } from '@biotic-ui/bottom-sheet'

type NavProps = {
	position: Position;
	onClose: () => void;
	children?: ReactNode;
}

let Nav = forwardRef<HTMLElement, NavProps>(({ position, onClose, children }, outerRef) => {
	let outsideRef = useOutsideClick(onClose)
	let [ref, setRef] = useState<HTMLElement | null>(null)
	let mainRef = useCombinedRefs(setRef, outerRef, outsideRef)

	useEffect(() => {
		let close = () => onClose()
		let handleScroll = (e: WheelEvent) => {
			let path = e.composedPath()
			let isMenu = path.find(node => node === ref)
			
			if (isMenu === undefined) {
				close()
			}

		}

		window.addEventListener('wheel', handleScroll)
		window.addEventListener('contextmenu', close)
		return () => {
			window.removeEventListener('wheel', handleScroll)
			window.removeEventListener('contextmenu', close)
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

	let child = Children.only(children) as ReactElement
	return cloneElement(child, {
		style: { position: 'absolute', zIndex: 9999 },
		ref: mainRef,
		onClick: onClose
	})
})

let DefaultOptions = {
	delay: 1000
}

type ContextMenuProps = {
	children?: ReactNode
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
		let ref = useOutsideClick<HTMLDivElement>(() => {
			setUseContextMenu(false)
		})

		if (!useConextMenu && !useBottomSheet) {
			return null
		}

		if (useBottomSheet) {
			let menu = cloneElement(children as ReactElement, {
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
			<Nav ref={ref} onClose={() => setUseContextMenu(false)} position={position}>
				<div>{ children }</div>
			</Nav>
		)

		return Container ? createPortal(Menu, Container) : null
	}

	return { onContextMenu, ContextMenu, ...longPress }
}

