import styled, { createGlobalStyle } from 'styled-components'

export let SheetHeader = styled.header`
	border-bottom: 1px solid var(--mui-bottom-sheet-background, rgba(0,0,0, 0.25));
	padding: 1.38em;
`

export let SheetTitle = styled.h3`
	margin: 0;
`

export let SheetContent = styled.div`
	padding: 0 1.38em;
`

type BottomDrawerProps =
	{ height?: number
	; open: boolean
	}

export let BottomDrawer = styled.div<BottomDrawerProps>`
	--bottom-default-sheet-shadow: 0px 8px 21px -5px rgba(0, 0, 0, 0.5);
	position: fixed;
	bottom: 0;
	left: 0;
	background: var(--mui-bottom-sheet-bg, #fff);
	border-top-left-radius: var(--bottom-sheet-border-radius, 1em);
	border-top-right-radius: var(--bottom-sheet-border-radius, 1em);
	width: 100%;
	max-height: 100vh;
	overflow-y: auto;
	z-index: var(--bottom-sheet-z-index, 9999);
	
	${p => p.height ? `height: ${p.height}px`: ''};
	${p => p.open && 'box-shadow: var(--bottom-sheet-shadow, var(--bottom-default-sheet-shadow));'}

	--menu-box-shadow: none;
	--menu-width: auto;
	--menu-padding: 1em;
	--menu-max-width: 100%;
	--menu-border: none;
`