import React from 'react'
import { createPortal } from 'react-dom'
import styled, { StyledComponent } from 'styled-components'

import { useGetContainer
			 , useOnEscape
			 , usePreventScroll
			 } from '@biotic-ui/std'

import { Backdrop } from '@biotic-ui/leptons'
import { motion, AnimatePresence, MotionProps } from 'framer-motion'

type OnClose =
	{ backdrop: boolean
	; escape: boolean
	}

type DialogProps =
	{ open?: boolean
	; backdrop?: boolean
	; onClose?: (e: OnClose) => void
	; className?: string
	}

export let Dialog: React.FC<DialogProps> = (props) => {
	let DialogContainer = useGetContainer('biotic-dialog')

	let { open = false
			, children
			, backdrop = true
			, onClose = () => {}
			, className = ''
		  } = props

	useOnEscape(() => open && onClose({ backdrop: false, escape: true }))
	usePreventScroll(open)

	function handleBackdrop() {
		onClose && onClose({ backdrop: true, escape: false })
	}

	let backdropVariants =
		{ hidden:
				{ opacity: 0 }

		, visible:
				{ opacity: 1 }
		}


	let wrapperVariants =
		{ hidden:
				{ opacity: 0
				, transition:
						{ when: 'afterChildren'
			    	}

			  , transitionEnd:
			  		{ display: 'none' }
				}

		, visible:
				{ display: 'flex'
				, opacity: 1
				}
		}

	let spring =
		{ type: 'spring'
		, damping: 10
		, stiffness: 100
		}

	let DialogPortal = (
		<Wrapper variants={wrapperVariants}
						 initial='hidden'
						 animate={open ? 'visible' : 'hidden'}
						 className={className}
		>

			{ backdrop &&
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
					<DialogContent as={motion.div}
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
	--dialog-default-shadow: 0px 8px 21px -5px rgba(0, 0, 0, 0.2);
	box-shadow: var(--dialog-shadow, var(--dialog-default-shadow));
	position: absolute;
	background: var(--dialog-background, #fff);
	z-index: 11;
	padding: var(--dialog-padding, var(--baseline));
	border-radius: var(--border-radius, calc(var(--baseline) * 0.5));
	max-width: 100vw;
	max-height: 100vh;
	overflow: auto;
`