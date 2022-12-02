import { forwardRef, HTMLAttributes } from 'react'
import * as styles from './bottom_sheet.styles'

export let SheetHeader = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
	return <header
		{...props}
		ref={ref}
		className={[styles.header, props.className ?? ''].join(' ')}
	/>
})

export let SheetTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>((props, ref) => {
	return <h4
		{...props}
		ref={ref}
		className={[styles.title, props.className ?? ''].join(' ')}
	/>
})

export let SheetContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
	return <div
		{...props}
		ref={ref}
		className={[styles.content, props.className ?? ''].join(' ')}
	/>
})
