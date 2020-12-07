import React, { useRef, useMemo, Children, ReactElement } from 'react'
import styled from 'styled-components'
import { useScrollShadow, useMatchMedia } from '@biotic-ui/std'
import { Drawer } from '@biotic-ui/drawer'
import { Scrollbar } from '@biotic-ui/leptons'
import { motion, AnimateSharedLayout } from 'framer-motion'

export enum Direction
	{ Left = 'left'
	, Right = 'rigth'
	}

type LayoutColumns = 
	{ direction: Direction
	}

export let StyledSidebarLayout = styled.div<LayoutColumns>`
	display: grid;
	grid-template-columns: ${layoutColumns};
	width: 100%;
	height: 100%;
	max-height: 100vh;
`

function layoutColumns({ direction }: LayoutColumns) {
	if (direction === 'rigth') {
		return '1fr auto'
	}

	return 'auto 1fr'
}

type Props =
	{ children?: ReactElement | Array<ReactElement>
	, right?: boolean
	}

export function SidebarLayout({ children, right = false }: Props) {
	
	let [aside, main] = useMemo(() => {
		let _children = Children.toArray(children) as Array<ReactElement>
		let aside = _children.find(node => node.type === Aside)
		let main = _children.find(node => node.type === Main)
		return [aside, main]
	}, [children])

	let direction = right ? Direction.Right : Direction.Left

	return (
		<AnimateSharedLayout>
			<StyledSidebarLayout direction={direction}>
				{ !right && aside }
				{ main }
				{ right && aside }
			</StyledSidebarLayout>
		</AnimateSharedLayout>
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

let ContentWrapper = styled(motion.div)<{ width: number}>`
	width: ${p => p.width}px;
	display: flex;
	flex-direction: column;

	--drawer-background: var(--aside-background, #fff);
	--menu-bg: var(--aside-background, #fff);

	--menu-box-shadow: none;
	--menu-width: auto;
	--menu-padding: 0;
	--border: none;

`

type AsideProps =
	{ children?: JSX.Element | Array<JSX.Element>
	; open: boolean
	; width?: number
	; drawer?: string
	; onClose: () => void
	}

export let Aside = (props: AsideProps) => {
	let { children
		  , open
		  , width = 250
		  , drawer = ''
		  , onClose = () => {}
		  } = props
	
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


	let variants =
		{ hidden:
				{ width: 0
				}

		, visible:
				{ width: width
				}
		}

	let contentVariants =
		{ hidden:
				{ transform: `translateX(-${width}px)`
				}

		, visible:
				{ transform: 'translateX(0px)'
				}
		}

	let transition =
		{ type: 'tween'
		, ease: 'easeOut'
		, duration: 0.5
		}

	return (
		<StyledAside layout
								 as={motion.aside}
								 variants={variants}
								 initial={open ? 'visible' : 'hidden'}
								 animate={open ? 'visible' : 'hidden'}
								 transition={transition} 
		>
		  <ContentWrapper width={width}
		  								variants={contentVariants}
		  								initial={open ? 'visible' : 'hidden'}
		  								animate={open ? 'visible' : 'hidden'}
		  								transition={transition} 
		  >
				{ children }
		  </ContentWrapper>
		</StyledAside>
	)
}

export let Main = styled(motion.main).attrs({ layout: true })`
	overflow: auto;
	height: 100%;
	width: 100%;
	${Scrollbar}
`