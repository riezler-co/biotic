import { css } from '@emotion/css'

export let container = css`
	--_default-layout: auto 1fr;
	width: 100%;
	height: 100%;
	max-block-size: 100vh;
	display: grid;
	grid-template-columns: var(--_layout-columns, var(--_default-layout));
`

export let aside = css`
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

export let content = css`
	width: var(--_aside-width);
	display: flex;
	flex-direction: column;
	height: 100%;

	--drawer-background: var(--aside-background, #fff);
	--menu-bg: var(--aside-background, #fff);

	--menu-box-shadow: none;
	--menu-width: auto;
	--menu-padding: 0;
	--border: none;
`

export let main = css`
	overflow: auto;
	height: 100%;
	width: 100%;
`