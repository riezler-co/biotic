import { forwardRef, HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLDivElement>

let TBContent = forwardRef<HTMLDivElement, Props>(({
	className = '',
	...props
}, ref) => {
	let classes = [
		'biotic-layout-topbar-content',
		'biotic-scrollbar',
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
		'biotic-layout-topbar-header',
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
		'biotic-layout-topbar',
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