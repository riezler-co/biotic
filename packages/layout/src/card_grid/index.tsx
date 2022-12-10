import { forwardRef, HTMLAttributes } from 'react'

export let CardGrid = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({
	className = '',
	...props
}, ref) => {
	let classes = [
		'biotic-layout-card-grid',
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