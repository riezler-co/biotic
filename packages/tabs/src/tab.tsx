import React, { MouseEvent } from 'react'
import styled from 'styled-components'
import { StyledTab } from './styled'
import { As } from './utils'

type TabProps
	= React.HTMLAttributes<HTMLElement>
	& As
	& { children: JSX.Element | Array<JSX.Element>
		; isActive: boolean
		; onClick: (e: MouseEvent) => void
		; onClose: (e: MouseEvent) => void
		; closable?: boolean
		; icon?: JSX.Element
		}

export function Tab(
	{ children
	, isActive
	, onClick
	, onClose
	, closable = false
	, as = 'li'
	, icon = <Close />
	, ...props
	}: TabProps
) {
	return (
		<TabWrapper isActive={isActive} as={as} {...props}>
			<StyledTab onClick={onClick}>
				{ children }
			</StyledTab>
			{ 
				closable &&
				<CloseButton onClick={onClose}>
					{ icon }
				</CloseButton>
			}
		</TabWrapper>
	)
}

export let CloseButton = styled.button`
	border: none;
	background: none;
	cursor: pointer;
	:focus {
	  outline: none;
	}

	svg {
		--size: calc(var(--baseline) * 2);
		width: var(--size);
		height: var(--size);
	}

	:hover svg {
		background: rgba(200, 200, 200, 0.5);
	}
`

export let TabWrapper = styled.li<{ isActive: boolean }>`
	list-style-type: none;
	background: ${p => p.isActive ? '#fff' : 'grey'};
	display: flex;
	align-items: center;
	border-left: 2px solid grey;

	:hover {
		background: ${p => p.isActive ? '#fff' : 'darkgrey'};
	}
`

let Close: React.FC<{}> = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
			<path d="M0 0h24v24H0z" fill="none"/>
		</svg>
	)
}