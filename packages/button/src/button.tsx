import { forwardRef, ButtonHTMLAttributes } from 'react'
import { X as CloseIcon } from 'phosphor-react'
import { Pulse } from '@biotic-ui/leptons'

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
		'biotic-button',
		raised ? 'biotic-button--raised' : '',
		className
	]

	return (
		<button
			ref={outerRef}
			{...props}
			className={classes.join(' ')}
			disabled={loading ? true : disabled}>
			<span>
				{ loading && <Pulse className='biotic-button--loading' size='1em' /> }
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
			className={['biotic-icon-button', className].join(' ')}
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
		'biotic-fab',
		raised ? 'biotic-fab--raised' : '',
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
			className={['biotic-button', 'biotic-button--link', className].join(' ')}
			disabled={loading ? true : disabled}
		>
			<span>
				{ loading && <Pulse className='biotic-button--loading' size='1em' /> }
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
			className={['biotic-button', 'biotic-button--outline', className].join('')}
			disabled={loading ? true : disabled}>
			<span>
				{ loading && <Pulse className='biotic-button--loading' size='1em' /> }
				{ children }
			</span>
		</button>
	)
})