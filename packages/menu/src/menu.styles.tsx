import { css } from '@emotion/css'

export let divider = css`
	margin: 0;
	background: var(--menu-border-color, #e9e9e9);
	border: none;
	height: 1px;
`

export let iconWrapper = css`
	position: absolute;
	inset-inline-start: 0;
	inline-size: 2em;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 2;
	block-size: 100%;

	svg {
		inline-size: 1em;
		block-size: 1em;
	}
`

export let list = css`
	--_default-shadow: 0 1px 3px rgba(0,0,0,0.13), 0 1px 2px rgba(0,0,0,0.24);
	--default-padding: var(--size-1) 0;
	inline-size: var(--menu-width, calc(var(--size-2) * 34));
	max-inline-size: var(--menu-max-width, calc(100vw - 1em));
	background: var(--menu-bg, #fff);
	color: var(--menu-color, #444);
	border-color: var(--border-color);
	border: var(--border);
	box-shadow: var(--menu-box-shadow, var(--_default-shadow)) ;
	list-style-type: none;
	padding: var(--menu-padding, --default-padding);
	margin: 0;
`

export let listItem = css`
	position: relative;

	& .menu-list {
		position: absolute;
		display: none;
	}

	&:hover .menu-list {
		display: block;
	}
`

export let itemTitle = css`
	inline-size: 100%;
	background: none;
	border: none;
	text-align: left;
	font-size: var(--menu-font-size, 1em);
	padding-inline: 0.5em;
	padding-block: 0.4375em;
	padding-inline-end: var(--size-2);
	padding-inline-start: var(--size-2);
	display: flex;
	align-items: center;
	position: relative;
	color: inherit;
	text-decoration: none;
	user-select: none;

	& span.arrow_right {
		position: absolute;
		right: 0;
		block-size: 100%;
	}

	& span.arrow_right svg {
		inline-size: 1.62em;
		block-size: 1.62em;
		margin-block-start: 0.2em;
	}

	&:hover {
		background: var(--menu-item-hover, rgba(230, 230, 230, 0.8));
	}
`

export let titleSubmenu = css`
	padding-inline-end: 1.5em;
`

export let titleIcon = css`
	padding-inline-start: 2em;
`