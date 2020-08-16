import styled from 'styled-components'

export let StyledMenu = styled.ul`
	--default-box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
	--border-color: var(--menu-border-color, #e9e9e9);
	--default-padding: 4px 0;

	width: var(--menu-width, 300px);
	max-width: calc(100vw - 1em);
	background: var(--menu-bg, #fff);
	color: var(--menu-color, #444);
	border-color: var(--border-color);
	border: var(--menu-border, 1px solid var(--border-color));
	box-shadow: var(--menu-box-shadow, var(--default-box-shadow)) ;
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

export let MenuItemTitle = styled.button`
	width: 100%;
	background: none;
	border: none;
	text-align: left;
	font-size: var(--menu-font-size, 1em);
	padding: 0.38em var(--menu-padding, 8px);
	padding-right: ${p => p.hasSubmenu ? '1.62em' : '8px'};
	padding-left: ${p => p.hasIcon ? '2em' : '8px'};
	display: flex;
	align-items: center;
	position: relative;
	cursor: ${p => p.cursor};

	span.arrow_right {
		position: absolute;
		right: 0;
		height: 100%;
	}

	span.arrow_right svg {
		width: 1.62em;
		height: 1.62em;
	}

	&:hover {;
		background: var(--menu-item-hover, rgba(230, 230, 230, 0.8))
	}
`