import React, { ReactNode } from 'react'
import { Ref } from 'react'
import { createPortal } from 'react-dom'
import styled  from 'styled-components'

import {
	useGetContainer,
	useOnEscape,
	usePreventScroll
} from '@biotic-ui/std'

import styles from '@biotic-ui/leptons/styles/backdrop.module.css'
import { motion, AnimatePresence } from 'framer-motion'

type OnClose = {
	backdrop: boolean;
	escape: boolean
}

type DialogProps = {
	open?: boolean;
	backdrop?: boolean;
	onClose?: (e: OnClose) => void;
	className?: string;
	parent?: Ref<HTMLElement>;
	children?: ReactNode;
}

export let Dialog = ({
	open = false,
	children,
	backdrop = true,
	onClose = () => {},
	parent = null,
	...props
}: DialogProps) => {
	let DialogContainer = useGetContainer('biotic-dialog')

	useOnEscape(() => open && onClose({ backdrop: false, escape: true }))
	usePreventScroll(open)

	function handleBackdrop() {
		onClose && onClose({ backdrop: true, escape: false })
	}

	let backdropVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	}

	let wrapperVariants = {
		hidden: {
			opacity: 0,
			transition: { when: 'afterChildren' },
			transitionEnd: { display: 'none' } 
		},

		visible: {
			display: 'flex',
			opacity: 1
		}
	}

	let spring = {
		type: 'spring',
		damping: 10,
		stiffness: 100,
	}

	let DialogPortal = (
		<Wrapper
				variants={wrapperVariants}
				initial='hidden'
				animate={open ? 'visible' : 'hidden'}
				{...props}
		>

			{ backdrop &&
				<motion.div
					className={`${styles.backdrop} ${open ? styles['backdrop--open'] : ''}`}
					initial='hidden'
					animate={open ? 'visible' : 'hidden'}
					variants={backdropVariants}
					onClick={handleBackdrop}
				/>
			}
			<AnimatePresence>
				{ open &&
					<DialogContent
								as={motion.div}
								aria-hidden={!open}
								role='dialog'
								initial={{ transform: 'scale(0.95)' }}
								animate={{ transform: 'scale(1)' }}
								exit={{ transform: 'scale(0.95)' }}
								transition={spring} 
					>
						{ children }
					</DialogContent>
				}
			</AnimatePresence>

		</Wrapper>
	)

	return DialogContainer ? createPortal(DialogPortal, DialogContainer) : null
}

let Wrapper = styled(motion.div)`
	display: none;
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 100vw;
`

export let DialogContent = styled.div`
	box-shadow: var(--dialog-shadow, var(--shadow-3));
	position: absolute;
	background: var(--dialog-background, #fff);
	z-index: 11;
	padding: var(--dialog-padding, var(--baseline-2));
	border-radius: var(--border-radius, var(--baseline));
	max-width: 100vw;
	max-height: 100vh;
	overflow: auto;
`