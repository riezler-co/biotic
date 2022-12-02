import { forwardRef, ButtonHTMLAttributes } from 'react'
import { X as CloseIcon } from 'phosphor-react'
import { Pulse } from '@biotic-ui/leptons'

import * as styles from './button.styles'

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
		raised ? styles.buttonRaised : '',
		className
	]

	return (
		<button
			ref={outerRef}
			{...props}
			className={classes.join(' ')}
			disabled={loading ? true : disabled}>
			<span>
				{ loading && <Pulse className={styles.buttonLoading} size='1em' /> }
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
			className={[styles.iconButton, className].join(' ')}
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
		styles.fab,
		raised ? styles.fabRaised : '',
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
			className={[styles.button, styles.buttonLink, className].join(' ')}
			disabled={loading ? true : disabled}
		>
			<span>
				{ loading && <Pulse className={styles.buttonLoading} size='1em' /> }
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
			className={[styles.button, styles.buttonOutline, className].join('')}
			disabled={loading ? true : disabled}>
			<span>
				{ loading && <Pulse className={styles.buttonLoading} size='1em' /> }
				{ children }
			</span>
		</button>
	)
})