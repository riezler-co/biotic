import React from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { getContainer, useOnEscape, usePreventScroll } from '@riezler/react-utils'
import { useSpring, animated } from 'react-spring'
import { Backdrop } from '@biotic-ui/leptons'

let DialogContainer = getContainer('biotic-dialog')

let Wrapper = styled.div`
	display: ${p => p.open ? 'flex' : 'none'};
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
	padding: var(--dialog-padding, 1em);
	border-radius: var(--border-radius, 0.5em);
	max-width: 100vw;
	max-height: 100vh;
	overflow: auto;
	width: ${p => typeof p.width === 'number' ? `${p.width}px` : p.width};
	height: ${p => typeof p.height === 'number' ? `${p.height}` : p.height};
`

export default function Dialog(props) {

	let { open = false
			, children
			, backdrop = true
			, onClose = () => {}
			, width = 'auto'
			, height = 'auto'
		  } = props

	let dialogAnimation = useSpring({
		transform: open ? 'scale(1)' : 'scale(0.95)'
	})

	let backdropAnimation = useSpring({
		opacity: open ? 1 : 0
	})

	useOnEscape(() => open && onClose({ backdrop: false, escape: true }))
	usePreventScroll(open)

	function handleBackdrop() {
		onClose && onClose({ backdrop: true, escape: false })
	}

	let DialogPortal = (
		<Wrapper open={open}>
			{ backdrop && <Backdrop open={open} style={backdropAnimation} onClick={handleBackdrop} /> }
			<DialogContent as={animated.div}
										 style={dialogAnimation}
										 width={width}
										 height={height}
										 aria-hidden={!open}
										 role='dialog'>
				{ children }
			</DialogContent>
		</Wrapper>
	)

	return createPortal(DialogPortal, DialogContainer)
}