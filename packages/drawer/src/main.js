import React from 'react'
import ReactDOM from 'react-dom'
import styled, { createGlobalStyle, css } from 'styled-components'
import { getContainer } from '@riezler/react-utils'
import { useSpring, animated } from 'react-spring'

let DrawerContainer = getContainer('biotic-drawer-container')

let Global = createGlobalStyle`
	body {
		overflow-y: ${p => p.open ? 'hidden' : 'normal'};
	}
	
	${p => !p.open ? '' : `
		#biotic-drawer-container {
			height: 100%;
			width: 100%;
		}
	`}
`

let StyledDrawer = styled.div`
	max-width: 100vw;
	${p => p.width ? `width: ${p.width}`: ''};
	height: 100%;
	position: fixed;
	background: var(--mui-drawer-color-bg, #fff);
	overflow-y: auto;
	top: 0;
	${p => p.left ? 'left: 0' : 'right: 0'};
	z-index: 5;
`

let Wrapper = styled.div`
	background: rgba(63, 63, 63, 0.3);
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	z-index: 4;

	${p => !p.open && `
			pointer-events: none;
	`}
`

let NoOp = () => {}
export function Drawer(props = {}) {
	let { open
			, children
			, maxWidth = 'auto'
			, onClose = NoOp
			, left = false
			, scrollable = false
			} = props

	let translate = maxWidth === 'auto' ? '100vw' : `${maxWidth}px`

	let transform = left
		? open ? 'translateX(0)' : `translateX(-${translate})`
		: open ? 'translateX(0)' : `translateX(${translate})`

	let drawerAnimation = useSpring({ transform })
	let wrapperAnimation = useSpring({
		opacity: open ? 1 : 0
	})

	React.useEffect(() => {
		function onEsc (e) {
			if(e.key=='Escape' && open){
			    onClose()
			}
		}

		window.addEventListener('keydown', onEsc)
		return () => {
			window.removeEventListener('keydown', onEsc)
		}
	})

	let Drawer = (
		<React.Fragment>
			{ !scrollable &&
				<React.Fragment>
					<Global open={open} />
					<Wrapper as={animated.div}
									 style={wrapperAnimation}
									 open={open}
									 onClick={onClose} />
				</React.Fragment>
			}
			<StyledDrawer open={open}
									  style={drawerAnimation}
									  width={translate}
									  as={animated.div}
									  left={left}>
				{ children }
			</StyledDrawer>
		</React.Fragment>
	)
	return ReactDOM.createPortal(Drawer, DrawerContainer)
}