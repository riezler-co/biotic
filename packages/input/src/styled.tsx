import { forwardRef, HTMLAttributes } from 'react'

export let Section = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className = '', ...props }, ref) => {
	return <section
		ref={ref}
		{...props}
		className={['biotic-form-section', className].join(' ')}
	/>
})

export let Label = forwardRef<HTMLLabelElement, HTMLAttributes<HTMLLabelElement>>(({ className = '', ...props }, ref) => {
	return <label
		ref={ref}
		{...props}
		className={['biotic-form-label', className].join(' ')}
	/>
})
