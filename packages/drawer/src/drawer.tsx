import { Fragment, HTMLAttributes } from 'react'
import { createPortal } from 'react-dom'

import {
	useGetContainer,
	useOnEscape,
	usePreventScroll
} from '@biotic-ui/std'

type CloseEvent = {
	backdrop: boolean,
	escape: boolean
}

export enum Position {
	Left = 'left',
	Right = 'right'
}

type Props = HTMLAttributes<HTMLDivElement> & {
	open: boolean,
	maxWidth?: 'auto' | number,
	onClose: (e: CloseEvent) => void,
	position?: Position,
	scrollable?: boolean,
	backdropClassName?: string,
}

let NoOp = () => {}
export function Drawer({
	open,
	children,
	maxWidth = 'auto',
	onClose = NoOp,
	position = Position.Left,
	scrollable = false,
	className = '',
	backdropClassName = '',
	...props
}: Props) {

	let DrawerContainer = useGetContainer('biotic-drawer-container')
	
	useOnEscape(() => open && onClose({ backdrop: false, escape: true }))
	usePreventScroll(open && !scrollable)

	function handleBackdrop() {
		onClose && onClose({ backdrop: true, escape: false })
	}

	let backdropClasses = [
		'biotic-backdrop',
		open ? `biotic-backdrop--open` : '',
		backdropClassName,
	].join(' ')

	let classes = [
		'biotic-drawer',
		position === Position.Left ? 'biotic-drawer--left' : 'biotic-drawer--right',
		open ? 'biotic-drawer--open' : '',
		className,
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
				{...props}
			>
				{ children }
			</div>
		</Fragment>
	)
	return DrawerContainer ? createPortal(Drawer, DrawerContainer) : null
}