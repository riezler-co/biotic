import { forwardRef, HTMLAttributes } from 'react'
import styles from './bottom_sheet.module.css'

export let SheetHeader = forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>((props, ref) => {
	return <header
		{...props}
		ref={ref}
		className={[styles['bottom-sheet-header'], props.className ?? ''].join(' ')}
	/>
})

export let SheetTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>((props, ref) => {
	return <h4
		{...props}
		ref={ref}
		className={[styles['bottom-sheet-title'], props.className ?? ''].join(' ')}
	/>
})

export let SheetContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
	return <div
		{...props}
		ref={ref}
		className={[styles['bottom-sheet-content'], props.className ?? ''].join(' ')}
	/>
})
