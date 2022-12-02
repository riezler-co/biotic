import { css } from '@emotion/css'
import { forwardRef, HTMLAttributes } from 'react'

export let sectionClass = css`
	margin-block-end: calc(var(--baseline) * 2);
`

export let Section = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className = '', ...props }, ref) => {
	return <section
		ref={ref}
		{...props}
		className={[sectionClass, className].join(' ')}
	/>
})

export let passwordWrapper = css`
	position: relative;
	display: flex;
	align-items: center;
`

export let switchViewButton = css`
	background: none;
	border: none;
	outline: none;
	position: absolute;
	inset-inline-end: var(--size-2);
	z-index: 5;
	background: var(--input-bg, none);
`

export let labelClass = css`
	margin-block-end: 0.25em;
	display: inline-block;
`

export let Label = forwardRef<HTMLLabelElement, HTMLAttributes<HTMLLabelElement>>(({ className = '', ...props }, ref) => {
	return <label
		ref={ref}
		{...props}
		className={[labelClass, className].join(' ')}
	/>
})

export let textareaClass = css`
  	scrollbar-color: var(--scrollbar, #cdcdcd);

	&::-webkit-scrollbar-track {
	    background-color: var(--scrollbar-bg, #f0f0f0);
	}

	&::-webkit-scrollbar {
	    width: var(--_scrollbar-width);
	    background-color: var(--scrollbar-bg, #f0f0f0);
	}

	&::-webkit-scrollbar-thumb {
	    background-color: var(--scrollbar, #cdcdcd);
	    border-radius: '10px';
	}
`