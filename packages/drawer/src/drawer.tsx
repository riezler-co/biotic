import { Fragment, ReactNode } from 'react'
import { createPortal } from 'react-dom'

import {
	useGetContainer,
	useOnEscape,
	usePreventScroll
} from '@biotic-ui/std'

import backdropStyles from '@biotic-ui/leptons/style/backdrop.module.css'
import styles from './drawer.module.css'

type CloseEvent = {
	backdrop: boolean,
	escape: boolean
}

type Props = {
	open: boolean,
	children?: ReactNode,
	maxWidth?: 'auto' | number,
	onClose: (e: CloseEvent) => void,
	left?: boolean,
	scrollable?: boolean,
}

let NoOp = () => {}
export function Drawer(props: Props) {
	let {
		open,
		children,
		maxWidth = 'auto',
		onClose = NoOp,
		left = true,
		scrollable = false,
	} = props

	let DrawerContainer = useGetContainer('biotic-drawer-container')
	
	useOnEscape(() => open && onClose({ backdrop: false, escape: true }))
	usePreventScroll(open && !scrollable)

	function handleBackdrop() {
		onClose && onClose({ backdrop: true, escape: false })
	}

	let backdropClasses = [
		backdropStyles.backdrop,
		open ? backdropStyles['backdrop--open'] : ''
	].join(' ')

	let classes = [
		styles.drawer,
		left ? styles['drawer--left'] : styles['drawer--right'],
		open ? styles['drawer--open'] : '',
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