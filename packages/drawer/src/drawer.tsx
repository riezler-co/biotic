import { Fragment, ReactNode } from 'react'
import { createPortal } from 'react-dom'

import {
	useGetContainer,
	useOnEscape,
	usePreventScroll
} from '@biotic-ui/std'

import { backdrop as backdropClass } from '@biotic-ui/leptons'
import * as styles from './drawer.styles'

type CloseEvent = {
	backdrop: boolean,
	escape: boolean
}

export enum Position {
	Left = 'left',
	Right = 'right'
}

type Props = {
	open: boolean,
	children?: ReactNode,
	maxWidth?: 'auto' | number,
	onClose: (e: CloseEvent) => void,
	position?: Position,
	scrollable?: boolean,
}

let NoOp = () => {}
export function Drawer(props: Props) {
	let {
		open,
		children,
		maxWidth = 'auto',
		onClose = NoOp,
		position = Position.Left,
		scrollable = false,
	} = props

	let DrawerContainer = useGetContainer('biotic-drawer-container')
	
	useOnEscape(() => open && onClose({ backdrop: false, escape: true }))
	usePreventScroll(open && !scrollable)

	function handleBackdrop() {
		onClose && onClose({ backdrop: true, escape: false })
	}

	let backdropClasses = [
		backdropClass,
		open ? `${backdropClass}--open` : ''
	].join(' ')

	let classes = [
		styles.drawer,
		position === Position.Left ? styles.position.left : styles.position.right,
		open ? styles.open : '',
	].join(' ')

	let Drawer = (
		<Fragment>
			{ !scrollable &&
				<div 
					className={backdropClasses}
					onClick={handleBackdrop}
				/>

			}
			<div
				className={classes}
				style={{ maxWidth }}
			>
				{ children }
			</div>
		</Fragment>
	)
	return DrawerContainer ? createPortal(Drawer, DrawerContainer) : null
}