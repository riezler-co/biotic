import { forwardRef, ButtonHTMLAttributes } from 'react'
import { X as CloseIcon } from 'phosphor-react'
import { Pulse } from '@biotic-ui/leptons'

import styles from './button.module.css'

type Props = {
	disabled?: boolean;
	raised?: boolean;
	loading?: boolean
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & Props

export let Button = forwardRef<HTMLButtonElement, ButtonProps>(({
	children,
	loading = false,
	disabled = false,
	className = '',
	raised,
	...props
}, outerRef) => {

	let classes = [
		styles.button,
		raised ? styles['button--raised'] : '',
		className
	]

	return (
		<button
			ref={outerRef}
			{...props}
			className={classes.join(' ')}
			disabled={loading ? true : disabled}>
			<span>
				{ loading && <Pulse className={styles['button--loading']} size='1em' /> }
				{ children }
			</span>
		</button>
	)
})

export let IconButton = forwardRef<HTMLButtonElement, ButtonProps>(({
	children,
	loading = false,
	disabled = false,
	className = '',
	...props
}, outerRef) => {
	return (
		<button
			ref={outerRef}
			{...props}
			className={[styles['button-icon'], className].join(' ')}
			disabled={loading ? true : disabled}
		>
			{ children }
		</button>
	)
})

export let CloseButton = forwardRef<HTMLButtonElement, ButtonProps>((props, outerRef) => {
	return (
		<IconButton aria-label="Close" ref={outerRef} {...props}>
			<CloseIcon />
		</IconButton>
	)
})

export let Fab = forwardRef<HTMLButtonElement, ButtonProps>(({
	children,
	loading = false,
	disabled = false,
	raised = false,
	className = '',
	...props
}, outerRef) => {
	let classes = [
		styles['button-fab'],
		raised ? styles['button-fab--raised'] : '',
		className,,
	].join(' ')
	return (
		<button
			ref={outerRef}
			{...props}
			className={classes}
			disabled={loading ? true : disabled}
		>
			{ loading ? <Pulse size='1em' /> : children }
		</button>
	)
})

export let LinkButton = forwardRef<HTMLButtonElement, ButtonProps>(({
	children,
	loading = false,
	disabled = false,
	className = '',
	...props
}, outerRef) => {
	return (
		<button
			ref={outerRef}
			{...props}
			className={[styles.button, styles['button-link'], className].join(' ')}
			disabled={loading ? true : disabled}
		>
			<span>
				{ loading && <Pulse className={styles['button--loading']} size='1em' /> }
				{ children }
			</span>
		</button>
	)
})

export let OutlineButton = forwardRef<HTMLButtonElement, ButtonProps>(({
	children,
	loading = false,
	disabled = false,
	className = '',
	...props
}, outerRef) => {
	return (
		<button
			ref={outerRef}
			{...props}
			className={[styles.button, styles['button-outline'], className].join('')}
			disabled={loading ? true : disabled}>
			<span>
				{ loading && <Pulse className={styles['button--loading']} size='1em' /> }
				{ children }
			</span>
		</button>
	)
})