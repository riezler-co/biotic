import styled from 'styled-components'

export let StyledMenu = styled.ul`
	--default-padding: calc(var(--baseline) / 2) 0;

	inline-size: var(--menu-width, calc(var(--baseline) * 34));
	max-inline-size: var(--menu-max-width, calc(100vw - 1em));
	background: var(--menu-bg, #fff);
	color: var(--menu-color, #444);
	border-color: var(--border-color);
	border: var(--border);
	box-shadow: var(--menu-box-shadow, var(--shadow-1)) ;
	list-style-type: none;
	padding: var(--menu-padding, --default-padding);
	margin: 0;
`

export let StyledMenuItem = styled.li`
	position: relative;

	${StyledMenu} {
		position: absolute;
		display: none;
	}

	&:hover ${StyledMenu} {
		display: block;
	}
`

type MenuItemTitleProps =
	{ cursor?: string
	; hasSubmenu?: boolean
	; hasIcon?: boolean
	}

export let MenuItemTitle = styled.button<MenuItemTitleProps>`
	inline-size: 100%;
	background: none;
	border: none;
	text-align: left;
	font-size: var(--menu-font-size, 1em);
	padding-inline: 0.5em;
	padding-block: 0.4375em;
	padding-inline-end: ${p => p.hasSubmenu ? '1.5em' : 'var(--baseline)'};
	padding-inline-start: ${p => p.hasIcon ? '2em' : 'var(--baseline)'};
	display: flex;
	align-items: center;
	position: relative;
	cursor: ${p => p.cursor};
	color: inherit;
	text-decoration: none;
	user-select: none;

	span.arrow_right {
		position: absolute;
		right: 0;
		block-size: 100%;
	}

	span.arrow_right svg {
		inline-size: 1.62em;
		block-size: 1.62em;
		margin-block-start: 0.2em;
	}

	&:hover {;
		background: var(--menu-item-hover, rgba(230, 230, 230, 0.8))
	}
`