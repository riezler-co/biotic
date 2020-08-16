import React from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { useGetContainer, useOnEscape, usePreventScroll } from '@riezler/react-utils'
import { useSpring, animated } from 'react-spring'
import { Backdrop } from '@biotic-ui/leptons'

let StyledDrawer = styled.div`
	max-width: 100vw;
	${p => p.width ? `width: ${p.width}`: ''};
	height: 100vh;
	position: fixed;
	background: var(--drawer-background, #fff);
	overflow-y: auto;
	top: 0;
	${p => p.side === 'left' ? 'left: 0' : 'right: 0'};
	z-index: 11;

	--menu-box-shadow: none;
	--menu-width: auto;
	--menu-padding: 0;
	--menu-border: none;
`

let NoOp = () => {}
export function Drawer(props = {}) {
	let { open
			, children
			, maxWidth = 'auto'
			, onClose = NoOp
			, left = true
			, scrollable = false
			} = props

	let DrawerContainer = useGetContainer('biotic-drawer-container')
	let translate = maxWidth === 'auto' ? '100vw' : `${maxWidth}px`

	let transform = left
		? open ? 'translateX(0px)' : `translateX(-${translate})`
		: open ? 'translateX(0px)' : `translateX(${translate})`

	let drawerAnimation = useSpring({ transform })
	let wrapperAnimation = useSpring({
		opacity: open ? 1 : 0
	})

	useOnEscape(() => open && onClose({ backdrop: false, escape: true }))
	usePreventScroll(open && !scrollable)

	function handleBackdrop() {
		onClose && onClose({ backdrop: true, escape: false })
	}

	let Drawer = (
		<React.Fragment>
			{ !scrollable &&
				<Backdrop as={animated.div}
								  style={wrapperAnimation}
								  open={open}
								  onClick={handleBackdrop} />
			}
			<StyledDrawer open={open}
									  style={drawerAnimation}
									  width={translate}
									  as={animated.div}
									  side={left ? 'left' : 'right'}>
				{ children }
			</StyledDrawer>
		</React.Fragment>
	)
	return DrawerContainer ? createPortal(Drawer, DrawerContainer) : null
}