import React from 'react'
import { FC, useRef, useEffect, Fragment } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useOnEscape } from '@biotic-ui/std'
import { Backdrop } from '@biotic-ui/leptons'

export enum Position {
	Bottom,
	Top,
	Left,
	Right,
}

function getPosition(position: Position): string {
	switch (position) {
		case Position.Top:
			return 'top: var(--baseline-2)'

		case Position.Left:
			return 'left: var(--baseline-2)'

		case Position.Right:
			return 'right: var(--baseline-2)'
		
		case Position.Bottom:
			return 'bottom: var(--baseline-2);'
	}
}

function getTaskDirection(position: Position): string {
	if (position === Position.Top || position === Position.Bottom) {
		return 'row'
	}

	return 'column'
}

function getDirection(position: Position) {
	if (position === Position.Top || position === Position.Bottom) {
		return 'left: 50%'
	}

	return 'top: 50%'
}

export let StyledFloatingTaskBar = styled(motion.div)<{ position: Position }>`
	position: fixed;
	z-index: 10;
	${p => getPosition(p.position)};
	${p => getDirection(p.position)};
`

function getPadding(position: Position): string {
	if (position === Position.Top || position === Position.Bottom) {
		return 'var(--baseline-2) calc(var(--baseline) * 5)'
	}

	return 'calc(var(--baseline) * 4) var(--baseline-2) '
}

export let FloatingTaskBarContent = styled.div<{ open: boolean, position: Position }>`
	position: relative;
	background: var(--task-bar-background, #000);
	padding: ${p => getPadding(p.position)};
	display: inline-flex;
	flex-direction: ${p => getTaskDirection(p.position)};
	grid-column-gap: var(--baseline-3);
	grid-row-gap: var(--baseline-3);
	border-radius: var(--baseline-2);
	${p => p.open ? 'box-shadow: var(--shadow-5);' : '' }
`

type Props = {
	open?: boolean;
	onClose?: () => void;
	position?: Position;
	closeBotton?: boolean;
	backdrop?: boolean;
}

export let FloatingTaskBar: FC<Props> = ({
	children,
	onClose = () => {},
	open = false,
	position = Position.Bottom,
	closeBotton = true,
	backdrop = false,
	...props
}) => {
	
	let variants = {
		hidden: {
			transform: hiddenTransform[position],
			opacity: 0,
		},
		visible: {
			transform: visibleTransform[position],
			opacity: 1,
		}
	}

	useOnEscape(onClose)

	let backdropVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	}

	return (
		<Fragment>
			{ backdrop &&
				<Backdrop
					as={motion.div}
					open={open}
					initial='hidden'
					animate={open ? 'visible' : 'hidden'}
					variants={backdropVariants}
					onClick={onClose}
				/>
			}
			
			<StyledFloatingTaskBar
				initial='hidden'
				animate={open ? 'visible' : 'hidden'}
				variants={variants}
				position={position}
				{...props}
			>
				<FloatingTaskBarContent open={open} position={position}>
					{ children }

					{ closeBotton &&	
						<CloseWrapper onClick={onClose}>
							<X/>
						</CloseWrapper>
					}
				</FloatingTaskBarContent>
			</StyledFloatingTaskBar>
		</Fragment>
	)
}

let hiddenTransform = {
	[Position.Bottom]: 'translateY(100%) translateX(-50%)',
	[Position.Top]: 'translateY(-100%) translateX(-50%)',
	[Position.Right]: 'translateX(100%) translateY(-50%)',
	[Position.Left]: 'translateX(-100%) translateY(-50%)',
}

let visibleTransform = {
	[Position.Bottom]: 'translateY(0%) translateX(-50%)',
	[Position.Top]: 'translateY(0%) translateX(-50%)',
	[Position.Right]: 'translateX(0%) translateY(-50%)',
	[Position.Left]: 'translateX(0%) translateY(-50%)',
}

export let Task = styled.button`
	--size: calc(var(--baseline) * 6);
	min-width: var(--size);
	min-height: var(--size);
	padding: var(---baseline);
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	background: none;
	border: none;
	color: var(--task-bar-color, #fff);
	flex-direction: column;

	svg {
		fill: currentColor;
		width: var(--baseline-3);
		height: var(--baseline-3);
	}
`

export let TaskLabel = styled.label`
	width: 100%;
	text-align: center;
	display: block;
	margin-top: var(--baseline);
	margin-bottom: 0;
`

let CloseWrapper = styled.button`
	position: absolute;
	top: -8px;
	right: -8px;
	background: #fff;
	border: 1px solid var(--task-bar-background, #000);
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	width: 24px;
	height: 24px;
	padding: 4px;

	svg {
		width: var(--baseline-3);
		height: var(--baseline-3);
	}
`

let X: FC<{}> = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="var(--task-bar-background, #000)" viewBox="0 0 256 256">
			<rect width="256" height="256" fill="none"></rect>
			<line x1="200" y1="56" x2="56" y2="200" stroke="var(--task-bar-background, #000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
			<line x1="200" y1="200" x2="56" y2="56" stroke="var(--task-bar-background, #000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
		</svg>
	)
}