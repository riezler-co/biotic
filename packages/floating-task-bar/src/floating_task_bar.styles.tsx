import { css } from '@emotion/css'

export let taskbar = css`
	position: fixed;
	z-index: 10;
`

export let content = css`
	position: relative;
	background: var(--task-bar-background, #000);
	padding: var(--_content-padding);
	display: inline-flex;
	flex-direction: var(--_content-direction);
	grid-column-gap: var(--size-5);
	grid-row-gap: var(--size-5);
	border-radius: var(--size-3);
	box-shadow: var(--_content-shadow, var(--shadow-5));
`

export let taskbarItem = css`
	--size: calc(var(--size-2) * 6);
	min-width: var(--size);
	min-height: var(--size);
	padding: var(--size-2);
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	background: none;
	border: none;
	color: var(--task-bar-color, #fff);
	flex-direction: column;

	svg {
		fill: currentColor;
		width: var(--size-5);
		height: var(--size-5);
	}
`

export let label = css`
	width: 100%;
	text-align: center;
	display: block;
	margin-top: var(--size-2);
	margin-bottom: 0;
`

export let close = css`
	position: absolute;
	top: -8px;
	right: -8px;
	background: #fff;
	border: 1px solid var(--task-bar-background, #000);
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	width: 24px;
	height: 24px;
	padding: 4px;

	svg {
		width: var(--size-5);
		height: var(--size-5);
	}
`