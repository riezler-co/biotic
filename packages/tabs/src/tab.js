import React from 'react'
import styled from 'styled-components'
import { StyledTab } from './styled'
import { Close } from '@biotic-ui/icon'

export function Tab(
	{ children
	, isActive
	, onClick
	, onClose
	, closable = false
	}
) {
	return (
		<Wrapper isActive={isActive}>
			<StyledTab onClick={onClick}>
				{ children }
			</StyledTab>
			{ 
				closable &&
				<StyledClose onClick={onClose}>
					<Close />
				</StyledClose>
			}
		</Wrapper>
	)
}

let StyledClose = styled.button`
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

let Wrapper = styled.li`
	list-style-type: none;
	background: ${p => p.isActive ? '#fff' : 'grey'};
	display: flex;
	align-items: center;
	border-left: 2px solid grey;

	:hover {
		background: ${p => p.isActive ? '#fff' : 'darkgrey'};
	}
`