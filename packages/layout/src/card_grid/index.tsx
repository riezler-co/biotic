import { forwardRef, HTMLAttributes } from 'react'
import { cardGrid } from './card_grid.styles'

export let CardGrid = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
	className = '',
	...props
}, ref) => {
	let classes = [
		cardGrid,
		className,
	].join(' ')

	return (
		<div
			ref={ref}
			{...props}
			className={classes}
		/>
	)
})