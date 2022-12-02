import { HTMLAttributes } from 'react'
import * as styles from './loading.styles'
import { getLength } from '../utils'

type LoadingProps = HTMLAttributes<HTMLDivElement> & {
	size?: string | number;
	color?: string;
}

export let Pulse = ({ size, color, className = '', style = {}, ...props }: LoadingProps) => {
	let classes = [
		styles.base,
		styles.pulse,
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
		styles.bounce,
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
		    <div className={styles.bounceDot}></div>
        	<div className={styles.bounceDot}></div>
		</div>
	)
}

export let Flow = ({ className, size, color, style, ...props }: LoadingProps) => {
	let classes = [
		styles.flow,
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
			<div className={styles.flowDot}></div>
			<div className={styles.flowDot}></div>
			<div className={styles.flowDot}></div>
		</div>
	)
}

export let CircleFade = ({ className, size, color, style, ...props }: LoadingProps) => {
	let classes = [
		styles.circleFade,
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
			<div className={styles.circleFadeDot}></div>
			<div className={styles.circleFadeDot}></div>
			<div className={styles.circleFadeDot}></div>
			<div className={styles.circleFadeDot}></div>
			<div className={styles.circleFadeDot}></div>
			<div className={styles.circleFadeDot}></div>
			<div className={styles.circleFadeDot}></div>
			<div className={styles.circleFadeDot}></div>
			<div className={styles.circleFadeDot}></div>
			<div className={styles.circleFadeDot}></div>
			<div className={styles.circleFadeDot}></div>
			<div className={styles.circleFadeDot}></div>
		</div>
	)
}