import { css } from "@emotion/css";

export let backdrop = css`
	background: var(--backdrop, rgba(63, 63, 63, 0.1));
	opacity: 0;
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: var(--background-z-index, 10);
	pointer-events: none;
	transition: opacity 300ms var(--ease-5);

	&--open {
		pointer-events: all;
		opacity: 1;
	}
`
