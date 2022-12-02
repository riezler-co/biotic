import { css } from '@emotion/css'

export let drawer = css`
	--_drawer-timing-function: var(--drawer-timing-function, var(--ease-5));
	--_drawer-duration: var(--drawer-duration, 200ms);

	max-width: 100vw;
	height: 100vh;
	position: fixed;
	background: var(--drawer-background, #fff);
	overflow-y: auto;
	top: 0;
	z-index: 11;
	transition: transform var(--_drawer-duration) var(--_drawer-timing-function);

	--menu-box-shadow: none;
	--menu-width: auto;
	--menu-padding: 0;
	--menu-border: none;
`

export let position = {
	left: css`
		left: 0;
		transform: translateX(-100%);
	`,

	right: css`
		right: 0;
		transform: translateX(100%);
	`
}

export let open = css`
	box-shadow: var(--shadow-2);
	transform: translateX(0);
`
