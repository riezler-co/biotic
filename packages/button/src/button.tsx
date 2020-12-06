import React, { FC } from 'react'
import styled from 'styled-components'
import { Close as CloseIcon } from '@biotic-ui/icon'
import { Pulse } from '@biotic-ui/leptons'

type ButtonProps = 
	{ disabled?: boolean
	; raised?: boolean
	; fullwidth?: boolean
	; loading?: boolean
	}

let StyledPulse = styled(Pulse)`
	position: absolute;
	left: calc(var(--baseline-2) * -1);
`

let StyledButton = styled.button<ButtonProps>`
	--defaut-shadow: var(--shadow-2);
	--default-button-background: rgb(239 239 239);
	--default-button-border: 1px solid rgb(215 215 215);

	position: relative;
	text-decoration: none;
	padding: var(--baseline) calc(var(--baseline) * 3);
	display: inline-flex;
	justify-content: center;
	border-radius: calc(var(--baseline-half));
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

	span {
		position: relative;
		display: flex;
		align-items: center;
	}
`

export let Button: FC<ButtonProps> = ({ children, loading = false, disabled = false, ...props }) => {
	return (
		<StyledButton {...props} disabled={loading ? true : disabled}>
			<span>
				{ loading && <StyledPulse size='1em' color='currentColor' /> }
				{ children }
			</span>
		</StyledButton>
	)
}

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

let StyledLinkButton = styled(StyledButton)`
	background: none;
	border: none;
`

export let LinkButton: FC<ButtonProps> = ({ children, loading = false, disabled = false, ...props }) => {
	return (
		<StyledLinkButton {...props} disabled={loading ? true : disabled}>
			{ loading && <StyledPulse size='1em' color='currentColor' /> }
			{ children }
		</StyledLinkButton>
	)
}

let StyledOutlineButton = styled(StyledButton)`
	background: none;
	border: 1px solid currentColor;
`
export let OutlineButton: FC<ButtonProps> = ({ children, loading = false, disabled = false, ...props }) => {
	return (
		<StyledOutlineButton {...props} disabled={loading ? true : disabled}>
			{ loading && <StyledPulse size='1em' color='currentColor' /> }
			{ children }
		</StyledOutlineButton>
	)
}