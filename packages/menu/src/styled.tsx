import { forwardRef, HTMLAttributes } from 'react'

type MenuProps = HTMLAttributes<HTMLElement>

export let StyledMenu = forwardRef<HTMLUListElement, MenuProps>(({
	className = '',
	children,
	...props
}, ref) => {
	let classes = [
		'biotic-menu-list',
		className,
	].join(' ')

	return (
		<ul ref={ref} className={classes} {...props}>
			{ children }
		</ul>
	)
})

export let StyledMenuItem = forwardRef<HTMLLIElement, MenuProps>(({
	className = '',
	children,
	...props
}, ref) => {
	let classes = [
		'biotic-menu-list-item',
		className,
	].join(' ')

	return (
		<li ref={ref} className={classes} {...props }>
			{ children }
		</li>
	)
})

type MenuItemTitleProps = HTMLAttributes<HTMLButtonElement> & {
	cursor?: string,
	hasSubmenu?: boolean,
	hasIcon?: boolean,
}

export let MenuItemTitle = forwardRef<HTMLButtonElement, MenuItemTitleProps>(({
	className = '',
	cursor = 'default',
	hasSubmenu = false,
	hasIcon = false,
	style = {},
	children,
	...props
}, ref) => {
	let classes = [
		'biotic-menu-list-item-title',
		hasSubmenu ? 'biotic-menu-list-item-title-submenu' : '',
		hasIcon ? 'biotic-menu-list-item-title-icon' : '',
		className,
	].join(' ')

	let s = {
		...style,
		cursor
	}

	return (
		<button
			ref={ref}
			className={classes}
			style={s}
			{...props}
		>
			{ children }			
		</button>
	)
})