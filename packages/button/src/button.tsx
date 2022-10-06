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
	return (
		<button
			ref={outerRef}
			{...props}
			data-raised={raised}
			className={[styles.button, className].join(' ')}
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
	className = '',
	...props
}, outerRef) => {
	return (
		<button
			ref={outerRef}
			{...props}
			className={[styles['button-fab'], className].join(' ')}
			disabled={loading ? true : disabled}
		>
			{ children }
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