import { ReactNode } from 'react'
import { Ref } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'

import {
	useGetContainer,
	useOnEscape,
	usePreventScroll
} from '@biotic-ui/std'


import backdropStyles from '@biotic-ui/leptons/styles/backdrop.module.css'
import styles from './dialog.module.css'

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
	className = '',
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
		<motion.div
			{...props}
			variants={wrapperVariants}
			initial='hidden'
			animate={open ? 'visible' : 'hidden'}
			className={[styles.dialog, className].join(' ')}
		>

			{ backdrop &&
				<motion.div
					className={`${backdropStyles.backdrop} ${open ? backdropStyles['backdrop--open'] : ''}`}
					initial='hidden'
					animate={open ? 'visible' : 'hidden'}
					variants={backdropVariants}
					onClick={handleBackdrop}
				/>
			}

			<AnimatePresence>
				{ open &&
					<motion.div
						aria-hidden={!open}
						role='dialog'
						initial={{ transform: 'scale(0.95)' }}
						animate={{ transform: 'scale(1)' }}
						exit={{ transform: 'scale(0.95)' }}
						transition={spring}
						className={styles['dialog-content']}
					>
						{ children }
					</motion.div>
				}
			</AnimatePresence>

		</motion.div>
	)

	return DialogContainer ? createPortal(DialogPortal, DialogContainer) : null
}
