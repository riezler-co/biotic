import { Fragment, forwardRef, HTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useOnEscape } from '@biotic-ui/std'

export enum Position {
	Bottom = 'bottom',
	Top = 'top',
	Left = 'left',
	Right = 'right',
}

let positions = Object.values(Position)

type Props = {
	open?: boolean,
	onClose?: () => void,
	position?: Position,
	closeBotton?: boolean,
	backdrop?: boolean,
	children?: ReactNode,
}

export let FloatingTaskBar = ({
	children,
	onClose = () => {},
	open = false,
	position = Position.Bottom,
	closeBotton = true,
	backdrop = false,
	...props
}: Props) => {

	let _position = positions.includes(position) ? position : Position.Bottom
	
	let variants = {
		hidden: {
			transform: hiddenTransform[_position],
			opacity: 0,
		},
		visible: {
			transform: visibleTransform[_position],
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
				<motion.div
					className={`biotic-backdrop ${open ? `biotic-backdrop--open` : ''}`}
					initial='hidden'
					animate={open ? 'visible' : 'hidden'}
					variants={backdropVariants}
					onClick={onClose}
				/>
			}
			
			<motion.div
				initial='hidden'
				animate={open ? 'visible' : 'hidden'}
				variants={variants}
				className='biotic-floating-taskbar'
				style={{
					[_position]: 'var(--size-3)',
					[getDirection(_position)]: '50%',
				}}
				{...props}
			>
				<div
					className='biotic-floating-taskbar-content'
					style={{
						padding: getPadding(_position),
						flexDirection: getTaskDirection(_position),
						boxShadow: open ? 'var(--shadow-2)' : ''
					}}
				>
					{ children }

					{ closeBotton &&	
						<CloseWrapper onClick={onClose}>
							<X/>
						</CloseWrapper>
					}
				</div>
			</motion.div>
		</Fragment>
	)
}

function getTaskDirection(position: Position): 'row' | 'column' {
	if (position === Position.Top || position === Position.Bottom) {
		return 'row'
	}

	return 'column'
}

function getDirection(position: Position): 'left' | 'top' {
	if (position === Position.Top || position === Position.Bottom) {
		return 'left'
	}

	return 'top'
}

function getPadding(position: Position): string {
	if (position === Position.Top || position === Position.Bottom) {
		return 'var(--size-3) calc(var(--size-2) * 5)'
	}

	return 'calc(var(--size-2) * 4) var(--size-3) '
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

export let Task = forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement>>(({
	className = '',
	...props
}, ref) => {
	let classes = [
		'biotic-floating-taskbar-task',
		className,
	].join(' ')

	return (
		<button
			ref={ref}
			{...props}
			className={classes}
		/>
	)
})

export let TaskLabel = forwardRef<HTMLLabelElement, HTMLAttributes<HTMLLabelElement>>(({
	className = '',
	...props
}, ref) => {
	let classes = [
		'biotic-floating-taskbar-task-label',
		className,
	].join(' ')

	return (
		<label
			ref={ref}
			{...props}
			className={classes}
		/>
	)
})

let CloseWrapper = forwardRef<HTMLButtonElement, HTMLAttributes<HTMLButtonElement>>(({
	className = '',
	...props
}, ref) => {
	let classes = [
		'biotic-floating-taskbar-close-wrapper',
		className,
	].join(' ')

	return (
		<button
			ref={ref}
			{...props}
			className={classes}
		/>
	)
})

let X = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" fill="var(--task-bar-background, #000)" viewBox="0 0 256 256">
			<rect width="256" height="256" fill="none"></rect>
			<line x1="200" y1="56" x2="56" y2="200" stroke="var(--task-bar-background, #000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
			<line x1="200" y1="200" x2="56" y2="56" stroke="var(--task-bar-background, #000)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line>
		</svg>
	)
}