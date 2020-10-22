import React from 'react'
import styled from 'styled-components'

enum Direction
	{ Top = 'top'
	, Right = 'rigth'
	, Bottom = 'bottom'
	, Left = 'left'
	}

function getDirection(direction: Direction): string {
	switch(direction.toLowerCase()) {
		case 'right':
			return '-180'

		case 'top':
			return '90'

		case 'bottom':
			return '-90'

		case 'left':
		default:
			return '0'
	}
}

type StyledProps =
	{ direction: Direction
	}

let StyledChevron = styled.svg<StyledProps>`
	transform: rotate(${p => getDirection(p.direction)}deg);
	transition: transform 250ms ease-in;
`

type Props =
	{ direction?: Direction
	}

export function Chevron({ direction = Direction.Left }: Props) {
	return (
		<StyledChevron
			xmlns="http://www.w3.org/2000/svg"
			width="24" height="24" viewBox="0 0 24 24"
			direction={direction}>
			<path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
			<path d="M0 0h24v24H0z" fill="none"/>
		</StyledChevron>
	)
}