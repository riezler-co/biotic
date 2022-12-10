import {
	forwardRef,
	OptgroupHTMLAttributes,
	OptionHTMLAttributes,
	SelectHTMLAttributes,
} from 'react'

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
			className={['biotic-input', 'biotic-select', className].join(' ')}
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
			className={['biotic-option', className].join(' ')}
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
			className={['biotic-optgroup', className].join(' ')}
		>
			{ children }
		</optgroup>
	)
})