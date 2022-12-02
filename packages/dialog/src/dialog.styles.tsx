import { css } from '@emotion/css'

export let dialog = css`
	display: none;
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

export let content = css`
	box-shadow: var(--dialog-shadow, var(--shadow-2));
	position: absolute;
	background: var(--dialog-background, #fff);
	z-index: 11;
	padding: var(--dialog-padding, var(--size-3));
	border-radius: var(--border-radius, var(--size-2));
	max-width: 100vw;
	max-height: 100vh;
	overflow: auto;
`