import { css } from '@emotion/css'

export let content = css`
	overflow: auto;
`

export let header = css`
	padding: var(--size-3) var(--size-5);
	border-bottom: var(--border);
	display: flex;
`

export let container = css`
	display: grid;
	height: 100%;
	grid-template-rows: var(--size-9) auto;
`