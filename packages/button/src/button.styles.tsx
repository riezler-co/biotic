import { css } from '@emotion/css'

export let button = css`
	--defaut-shadow: var(--shadow-2);
	--default-button-background: rgb(239 239 239);
	--default-button-hover: rgb(220 220 220);
	--default-button-border: 1px solid rgb(215 215 215);

	position: relative;
	text-decoration: none;
	padding-inline: var(--size-3);
	padding-block: var(--size-2);
	display: inline-flex;
	justify-content: center;
	border-radius: var(--size-1);
	font-weight: 500;
	letter-spacing: 1px;
	cursor: pointer;
	opacity: 1;
	color: var(--button-color, #141923);
	background: var(--button-bg, var(--default-button-background));	
	font-size: 12px; /* Firefox Andoird fallback */
	font-size: max(0.75em, 12px);
	border: var(--button-border, var(--default-button-border));

	&:not([disabled]):hover {
		background: var(--button-bg--hover, var(--default-button-hover));
	}

	span {
		position: relative;
		display: flex;
		align-items: center;
	}

	&:disabled {
		cursor: default;
		opacity: 0.8;
	}
`

export let buttonRaised = css`
	color:  var(--button-raised-color, #fff);
	background: var(--button-raised-bg, #141923);
	box-shadow: var(--shadow-2);
	border-color: var(--button-raised-border-color, #292f39);

	&:not([disabled]):hover {
		background: var(--button-raised-bg--hover, #292f39);
	}
`

export let buttonLink = css`
	background: none;
	border: none;
`

export let buttonOutline = css`
	background: none;
	border: 1px solid currentColor;
`

export let buttonLoading = css`
	position: absolute;
	inset-inline-start: calc(var(--size-3) * -0.9);
`

export let fab = css`
	--_fab-size: var(--size-8);
	width: var(--_fab-size);
	height: var(--_fab-size);
	border-radius: 50%;
	position: fixed;
	inset-block-end: var(--size-3);
	inset-inline-end: var(--size-3);
	z-index: 2;
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;
	color: var(--button-fab-color, #fff);
	background: var(--button-fab-bg, #141923);
	cursor: pointer;

	&:disabled {
		cursor: default;
		opacity: 0.8;
	}

	&:not([disabled]):hover {
		background: var(--button-raised-bg--hover, #292f39);
	}

	& svg {
		fill: var(--button-icon-fill, currentColor);
		width: 68%;
		height: 68%;
	}
`

export let fabRaised = css`
	box-shadow: var(--shadow-3);
`

export let iconButton = css`
	background: none;
	border: none;
	display: flex;
	align-items: center;
	text-decoration: none;
	color: inherit;
	cursor: pointer;
	opacity: 1;
	padding: 0;

	& :disabled {
		cursor: default;
		opacity: 0.8
	}
`