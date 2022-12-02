import { css } from '@emotion/css'

export let list = css`
	list-style-type: none;
	padding: 0;
	margin: 0;
`

export let title = css`
	background: none;
	border: none;
	flex-grow: 0;
	cursor: pointer;
	padding: calc(var(--size-2) / 2) var(--size-2);
`

export let content = css`
	padding: var(--size-2);
`

export let contentOpen = css`
	padding: calc(var(--size-2) / 2);
`
