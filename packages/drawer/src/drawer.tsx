import React from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

import {
	useGetContainer,
	useOnEscape,
	usePreventScroll
} from '@biotic-ui/std'

import styles from '@biotic-ui/leptons/styles/backdrop.modules.css'
import { motion } from 'framer-motion'

type StyledProps = {
	width?: string,
	side?: 'left' | 'right',
	isOpen: boolean,
}

let StyledDrawer = styled.div<StyledProps>`
	max-width: 100vw;
	height: 100vh;
	position: fixed;
	box-shadow: ${p => p.isOpen ? 'var(--shadow-3)' : 'none'};
	background: var(--drawer-background, #fff);
	overflow-y: auto;
	top: 0;
	z-index: 11;
	${p => p.width ? `width: ${p.width}`: ``};
	${p => p.side === 'left' ? 'left: 0' : 'right: 0'};

	--menu-box-shadow: none;
	--menu-width: auto;
	--menu-padding: 0;
	--menu-border: none;
`

type CloseEvent = {
	backdrop: boolean,
	escape: boolean
}

type Props = {
	open: boolean,
	children?: JSX.Element | Array<JSX.Element>,
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

	let backdropVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	}

	let translate = maxWidth === 'auto' ? '100vw' : `${maxWidth}px`
	let drawerVariants = {
		hidden: { transform: left ? `translateX(-${translate})` : `translateX(${translate})` },
		visible: { transform: 'translateX(0px)' },
	}

	let spring = {
		type: 'spring',
		damping: 21,
		stiffness: 130
	}

	let Drawer = (
		<React.Fragment>
			{ !scrollable &&
				<motion.div 
					className={`${styles.backdrop} ${open ? styles['backdrop--open'] : ''}`}
					initial='hidden'
					animate={open ? 'visible' : 'hidden'}
					variants={backdropVariants}
					onClick={handleBackdrop}
				/>

			}
			<StyledDrawer
				as={motion.div}
				initial='hidden'
				animate={open ? 'visible' : 'hidden'}
				variants={drawerVariants}
				side={left ? 'left' : 'right'}
				width={translate}
				transition={spring} 
				isOpen={open}
			>
				{ children }
			</StyledDrawer>
		</React.Fragment>
	)
	return DrawerContainer ? createPortal(Drawer, DrawerContainer) : null
}