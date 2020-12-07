import styled from 'styled-components'

export let StyledMenu = styled.ul`
	--default-padding: calc(var(--baseline) / 2) 0;

	width: var(--menu-width, calc(var(--baseline) * 34));
	max-width: var(--menu-max-width, calc(100vw - 1em));
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
	width: 100%;
	background: none;
	border: none;
	text-align: left;
	font-size: var(--menu-font-size, 1em);
	padding: 0.4375em 0.5em;
	padding-right: ${p => p.hasSubmenu ? '1.5em' : 'var(--baseline)'};
	padding-left: ${p => p.hasIcon ? '2em' : 'var(--baseline)'};
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
		height: 100%;
	}

	span.arrow_right svg {
		width: 1.62em;
		height: 1.62em;
		margin-top: 0.2em;
	}

	&:hover {;
		background: var(--menu-item-hover, rgba(230, 230, 230, 0.8))
	}
`