import React, { useRef } from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import { useScrollShadow, useMatchMedia } from '@biotic-ui/std'
import { Drawer } from '@biotic-ui/drawer'

export let SidebarLayout = styled.div`
	display: grid;
	grid-template-columns: auto 1fr;
	transition: grid-template-columns 500ms ease;
	width: 100%;
	height: 100%;
	max-height: 100vh;
`

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
`