import React from 'react'
import styled from 'styled-components'
import { Close as CloseIcon } from '@biotic-ui/icon'

type ButtonProps = 
	{ disabled?: boolean
	; raised?: boolean
	; fullwidth?: boolean
	}

export let Button = styled.button<ButtonProps>`
	--defaut-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
	--default-button-border: 1px solid #bab8b8;
	--default-button-background: rgb(239 239 239);

	text-decoration: none;
	padding: var(--baseline) calc(var(--baseline) * 3);
	display: inline-block;
	width: ${p => p.fullwidth ? '100%' : 'auto'};
	text-align: center;
	border-radius: calc(var(--baseline) * 0.8);
	font-weight: 600;
	letter-spacing: 1px;
	cursor: ${p => p.disabled ? 'default' : 'pointer'};;
	opacity: ${p => p.disabled ? '0.8' : '1'};
	
	color: ${p => p.raised
		? 'var(--button-raised-color, #fff)'
		: 'var(--button-color, #141923)'};

	background: ${p => p.raised
		? 'var(--button-raised-bg, #141923)'
		: 'var(--button-bg, var(--default-button-background))'};
	
	${p => p.raised && 'box-shadow: var(--button-shadow, var(--default-shadow))'};
	
	font-size: 12px; /* Firefox Andoird fallback */
	font-size: max(0.75em, 12px);
	border: var(--button-border, var(--default-button-border));
`

type IconButtonProps = 
	{ disabled?: boolean
	}

export let IconButton = styled.button<IconButtonProps>`
	background: none;
	border: none;
	display: flex;
	align-items: center;
	text-decoration: none;
	color: inherit;
	cursor: ${p => p.disabled ? 'default' : 'pointer'};
	opacity: ${p => p.disabled ? '0.5' : '1'};
	padding: 0;
`

export let CloseButton: React.FC<IconButtonProps> = ({ ...props }) => {
	return (
		<IconButton aria-label="Close" {...props}>
			<CloseIcon />
		</IconButton>
	)
}

export let Fab = styled.button`
	--size: calc(var(--baseline) * 5);
	width: var(--size);
	height: var(--size);
	border-radius: 50%;
	position: fixed;
	bottom: calc(var(--baseline) * 2);
	right: calc(var(--baseline) * 2);
	z-index: 2;
	border: none;
	display: flex;
	justify-content: center;
	align-items: center;
	background: var(--button-color-fab);
	cursor: pointer;
	
	svg {
		fill: var(--button-icon-fill, #141923);
	}

`

export let LinkButton = styled(Button)`
	background: none;
	border: none;
`

export let OutlineButton = styled(LinkButton)`
	background: none;
`
