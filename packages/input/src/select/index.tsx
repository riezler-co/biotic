import {
	forwardRef,
	OptgroupHTMLAttributes,
	OptionHTMLAttributes,
	SelectHTMLAttributes,
} from 'react'

import {
	input,
	select,
	option,
	optgroup
} from '@biotic-ui/leptons'

let classes = { input, select, option, optgroup }

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
			className={[classes.input, classes.select, className].join(' ')}
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
			className={[classes.option, className].join(' ')}
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
			className={[classes.optgroup, className].join(' ')}
		>
			{ children }
		</optgroup>
	)
})