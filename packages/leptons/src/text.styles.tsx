import { css } from "@emotion/css";

export let ellipsis = css`
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
`

export let clamp = css`
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: var(--clamp-lines, 1);
	overflow: hidden;
`

export let error = css`
	color: var(--color-error);
	text-align: center;
`

export let small = css`
	font-size: 0.75em;
`

export let muted = css`
	color: var(--muted);
`