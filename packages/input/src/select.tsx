import styles from '@biotic-ui/leptons/styles/input.module.css'
import { forwardRef, OptgroupHTMLAttributes, OptionHTMLAttributes, SelectHTMLAttributes } from 'react'

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement>

export let Select = forwardRef<HTMLSelectElement, SelectProps>(({
	className = '',
	children,
	...props
}, ref) => {
	return (
		 <select
			ref={ref}
			{...props}
			className={[styles.input, styles.select, className].join(' ')}
		>
			{ children }
		</select>
	)
})


export type OptionProps = OptionHTMLAttributes<HTMLOptionElement>

export let Option = forwardRef<HTMLOptionElement, OptionProps>(({
	className = '',
	children,
	...props
}, ref) => {
	return (
		 <option
			ref={ref}
			{...props}
			className={[styles.option, className].join(' ')}
		>
			{ children }
		</option>
	)
})


export type OptgroupProps = OptgroupHTMLAttributes<HTMLOptGroupElement>

export let Optgroup = forwardRef<HTMLOptGroupElement, OptionProps>(({
	className = '',
	children,
	...props
}, ref) => {
	return (
		 <optgroup
			ref={ref}
			{...props}
			className={[styles.optgroup, className].join(' ')}
		>
			{ children }
		</optgroup>
	)
})