import { css } from '@emotion/css'

export let header = css`
	border-bottom: var(--border);
	padding: var(--size-3);
	display: flex;
`

export let title = css`
	margin: 0;
`

export let content = css`
	padding: var(--size-3);
`

export let drawer = css`
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
	max-height: 100vh;

	--menu-box-shadow: none;
	--menu-width: auto;
	--menu-padding: 1em;
	--menu-max-width: 100%;
	--menu-border: none;
`

export let drawerOpen = css`
	box-shadow: var(--bottom-sheet-shadow, var(--bottom-default-sheet-shadow));
`