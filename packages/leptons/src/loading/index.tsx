import { HTMLAttributes } from 'react'
import { getLength } from '../utils'

type LoadingProps = HTMLAttributes<HTMLDivElement> & {
	size?: string | number;
	color?: string;
}

export let Pulse = ({ size, color, className = '', style = {}, ...props }: LoadingProps) => {
	let classes = [
		'biotic-loading',
		'biotic-loading-pulse',
		className
	]

	let _style = {
		...style,
		'--loading-size': getLength(size),
		'--loading-color': color,
	} 

	return <div
		{...props}
		style={_style}
		className={classes.join(' ')}
	/>
}

export let Bounce = ({ className, size, color, style, ...props }: LoadingProps) => {
	let classes = [
		'biotic-loading',
		'biotic-loading-bounce',
		className
	]

	let _style = {
		...style,
		'--loading-size': getLength(size),
		'--loading-color': color,
	} 

	return (
		<div
			{...props}
			style={_style}
			className={classes.join(' ')}
		>
		    <div className='biotic-loading-bounce-dot'></div>
        	<div className='biotic-loading-bounce-dot'></div>
		</div>
	)
}

export let Flow = ({ className, size, color, style, ...props }: LoadingProps) => {
	let classes = [
		'biotic-loading',
		'biotic-loading-flow',
		className
	]

	let _style = {
		...style,
		'--loading-size': getLength(size),
		'--loading-color': color,
	} 

	return (
		<div
			{...props}
			style={_style}
			className={classes.join(' ')}
		>
			<div className='biotic-loading-flow-dot'></div>
			<div className='biotic-loading-flow-dot'></div>
			<div className='biotic-loading-flow-dot'></div>
		</div>
	)
}

export let CircleFade = ({ className, size, color, style, ...props }: LoadingProps) => {
	let classes = [
		'biotic-loading',
		'biotic-loading-circle-fade',
		className
	]

	let _style = {
		...style,
		'--loading-size': getLength(size),
		'--loading-color': color,
	}

	return (
		<div
			{...props}
			style={_style}
			className={classes.join(' ')}
		>
			<div className='biotic-loading-circle-fade-dot'></div>
			<div className='biotic-loading-circle-fade-dot'></div>
			<div className='biotic-loading-circle-fade-dot'></div>
			<div className='biotic-loading-circle-fade-dot'></div>
			<div className='biotic-loading-circle-fade-dot'></div>
			<div className='biotic-loading-circle-fade-dot'></div>
			<div className='biotic-loading-circle-fade-dot'></div>
			<div className='biotic-loading-circle-fade-dot'></div>
			<div className='biotic-loading-circle-fade-dot'></div>
			<div className='biotic-loading-circle-fade-dot'></div>
			<div className='biotic-loading-circle-fade-dot'></div>
			<div className='biotic-loading-circle-fade-dot'></div>
		</div>
	)
}