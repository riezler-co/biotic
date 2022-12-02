import { css } from '@emotion/css'

export let input = css`
	--default-border: 1px solid rgba(34,36,38,.15);
	margin: 0;
	max-inline-size: 100%;
	inline-size: 100%;
	flex: 1 0 auto;
	outline: none;
	-webkit-tap-highlight-color: var(--tap-highlight-color, rgba(255,255,255,0));
	text-align: left;
	line-height: 1.21428571em;
	padding-inline: 0.62em; 
	padding-block: .38em;
	block-size: var(--baseline-4);
	background: var(--input-bg, none);
	border: var(--input-border, var(--default-border));
	color: var(--input-color, rgba(0,0,0,.87));
	border-radius: var(--input-border-radius, calc(var(--baseline) * 0.5));
	-webkit-transition: box-shadow .1s ease,border-color .1s ease;
	transition: box-shadow .1s ease, border-color .1s ease;
	box-shadow: none;
	font-size: inherit;
	box-sizing: border-box;

	&::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
	  color: var(--input-color-placeholder);
	  opacity: 1; /* Firefox */
	}

	&:-ms-input-placeholder { /* Internet Explorer 10-11 */
	  color: var(--input-color-placeholder);
	}

	&::-ms-input-placeholder { /* Microsoft Edge */
	  color: var(--input-color-placeholder);
	}

	&:disabled {
	  opacity: var(--input-disabled-opacity, 0.8);
	  background: var(--input-disabled-background, rgba(100,100,100, 0.1));
	}
`

export let select = css`
	&[multiple] {
	  block-size: var(--size-8);
	}
`

export let option = css`
	background-color: var(--option-background, inherit);
	color: var(--option-color, inherit);
`

export let optgroup = css`
	background-color: var(--optgroup-background, inherit);
	color: var(--optgroup-color, inherit);
`