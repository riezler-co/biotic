import { forwardRef, HTMLAttributes } from 'react'
import * as styles from './topbar.styles'
import { scrollbar } from '@biotic-ui/leptons'

type Props = HTMLAttributes<HTMLDivElement>

let TBContent = forwardRef<HTMLDivElement, Props>(({
	className = '',
	...props
}, ref) => {
	let classes = [
		styles.content,
		scrollbar,
		className,
	].join(' ')

	return (
		<div
			ref={ref}
			{...props}
			className={classes}
		/>
	)
})

let TBHeader = forwardRef<HTMLDivElement, Props>(({
	className = '',
	...props
}, ref) => {
	let classes = [
		styles.header,
		className,
	].join(' ')

	return (
		<header
			ref={ref}
			{...props}
			className={classes}
		/>
	)
})

let TBContainer = forwardRef<HTMLDivElement, Props>(({
	className = '',
	...props
}, ref) => {
	let classes = [
		styles.container,
		className,
	].join(' ')

	return (
		<div
			ref={ref}
			{...props}
			className={classes}
		/>
	)
})

export let TopBar = {
	Container: TBContainer,
	Content: TBContent,
	Header: TBHeader
}