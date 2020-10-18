import React, { useRef, useMemo } from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import { useScrollShadow, useMatchMedia } from '@biotic-ui/std'
import { Drawer } from '@biotic-ui/drawer'
import { Scrollbar } from '@biotic-ui/leptons'

export let StyledSidebarLayout = styled.div`
	display: grid;
	grid-template-columns: ${layoutColumns};
	transition: grid-template-columns 500ms ease;
	width: 100%;
	height: 100%;
	max-height: 100vh;
`

function layoutColumns({ direction }) {
	if (direction === 'rigth') {
		return '1fr auto'
	}

	return 'auto 1fr'
}

export function SidebarLayout({ children, right = false }) {
	
	let [aside, main] = useMemo(() => {
		let _children = Children.toArray(children)
		let aside = _children.find(node => node.type === Aside)
		let main = _children.find(node => node.type === Main)
		return [aside, main]
	}, [children])

	let direction = right ? 'right' : 'left'

	return (
		<StyledSidebarLayout direction={direction}>
			{ !left && aside }
			{ main }
			{ left && aside }
		</StyledSidebarLayout>
	)
}

let StyledAside = styled.aside`
	height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
	background: var(--aside-background, #fff);
	-ms-overflow-style: none;  /* IE and Edge */
	scrollbar-width: none;  /* Firefox */
	&::-webkit-scrollbar {
	  display: none;
	}
`

let ContentWrapper = styled.div`
	width: ${p => p.width}px;
	display: flex;
	flex-direction: column;

	--drawer-background: var(--aside-background, #fff);
	--menu-bg: var(--aside-background, #fff);

	--menu-box-shadow: none;
	--menu-width: auto;
	--menu-padding: 0;
	--menu-border: none;
`

export let Aside = (props) => {
	let { children
		  , open
		  , width = 250
		  , drawer = ''
		  , onClose = () => {}
		  } = props
	
	let wrapperAnimation = useSpring({
		width: open ? `${width}px` : '0px'
	})

	let contentAnimation = useSpring({
		transform: open ? 'translateX(0px)' : `translateX(-${width}px)`
	})

	let useDrawer = useMatchMedia(drawer)

	if (useDrawer) {
		return (
			<React.Fragment>
				
				<div>{/*
					this way we don't need to update the grid-template-columns
					and the main area will get the full width
				*/}</div>

				<Drawer open={open} maxWidth={width} onClose={() => onClose && onClose()}>
					{ children }
				</Drawer>
				
			</React.Fragment>
		)
	}

	return (
		<StyledAside as={animated.aside}
		             style={wrapperAnimation}>
		  <ContentWrapper as={animated.div}
		  								style={contentAnimation}
		  								width={width}>
				{ children }
		  </ContentWrapper>
		</StyledAside>
	)
}

export let Main = styled.main`
	overflow: auto;
	height: 100%;
	width: 100%;
	${Scrollbar}
`