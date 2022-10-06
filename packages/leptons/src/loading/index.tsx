import { HTMLAttributes } from 'react'
import styles from './loading.module.css'

type LoadingProps = HTMLAttributes<HTMLDivElement> & {
	size?: string | number;
	color?: string;
}

export let Pulse = ({ size, color, className = '', style = {}, ...props }: LoadingProps) => {
	let classes = [
		styles['loading-base'],
		styles['loading-pulse'],
		className
	]

	let _style = {
		...style,
		'--loading-size': size,
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
		styles['loading-base'],
		styles['loading-bounce'],
		className
	]

	let _style = {
		...style,
		'--loading-size': size,
		'--loading-color': color,
	} 

	return (
		<div
			{...props}
			style={_style}
			className={classes.join(' ')}
		>
		    <div className={styles['loading-bounce-dot']}></div>
        	<div className={styles['loading-bounce-dot']}></div>
		</div>
	)
}

export let Flow = ({ className, size, color, style, ...props }: LoadingProps) => {
	let classes = [
		styles['loading-base'],
		styles['loading-flow'],
		className
	]

	let _style = {
		...style,
		'--loading-size': size,
		'--loading-color': color,
	} 

	return (
		<div
			{...props}
			style={_style}
			className={classes.join(' ')}
		>
			<div className={styles['loading-flow-dot']}></div>
			<div className={styles['loading-flow-dot']}></div>
			<div className={styles['loading-flow-dot']}></div>
		</div>
	)
}

export let CircleFade = ({ className, size, color, style, ...props }: LoadingProps) => {
	let classes = [
		styles['loading-base'],
		styles['loading-circle-fade'],
		className
	]

	let _style = {
		...style,
		'--loading-size': size,
		'--loading-color': color,
	}

	return (
		<div
			{...props}
			style={_style}
			className={classes.join(' ')}
		>
			<div className={styles['loading-circle-fade-dot']}></div>
			<div className={styles['loading-circle-fade-dot']}></div>
			<div className={styles['loading-circle-fade-dot']}></div>
			<div className={styles['loading-circle-fade-dot']}></div>
			<div className={styles['loading-circle-fade-dot']}></div>
			<div className={styles['loading-circle-fade-dot']}></div>
			<div className={styles['loading-circle-fade-dot']}></div>
			<div className={styles['loading-circle-fade-dot']}></div>
			<div className={styles['loading-circle-fade-dot']}></div>
			<div className={styles['loading-circle-fade-dot']}></div>
			<div className={styles['loading-circle-fade-dot']}></div>
			<div className={styles['loading-circle-fade-dot']}></div>
		</div>
	)
}