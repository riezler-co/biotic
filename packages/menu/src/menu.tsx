import {
	Children,
	useMemo,
	useState,
	useLayoutEffect,
	useRef,
	useCallback,
	ReactElement,
	MouseEvent,
	forwardRef,
    cloneElement,
    Fragment,
    ReactNode,
} from 'react'

import ArrowRight from './arrow_right'
import { getSubmenuPosition } from './utils'
import ArrowBack from './arrow_back'
import { useCombinedRefs, useResize } from '@biotic-ui/std'
import { StyledMenu, StyledMenuItem, MenuItemTitle } from './styled'
import { divider, iconWrapper } from './menu.styles'

type Props = {
	children?: ReactNode;
	icon?: boolean;
	submenu?: boolean;
	replace?: boolean;
	className?: string;
	style?: { [key:string]: any };
	onClick?: (e: MouseEvent) => void
}

export let Menu = forwardRef<Element, Props>((props, outerRef) => {
	let menuRef = useRef<Element | null>(null)
	let [hover, setHover] = useState(true)

	let ref = useCombinedRefs(outerRef, menuRef)

	let shouldHover = useCallback(
		() => {
			if (menuRef.current === null) return
			
			let { current } = menuRef

			let { width } = current.getBoundingClientRect()
			let { innerWidth } = window
			let parentNode = current.parentNode as HTMLElement

			if (width === 0 && parentNode) {
				width = parentNode.getBoundingClientRect().width
			}

			if (width * 3 > innerWidth) {
				setHover(false)
			} else {
				setHover(true)
			}
		}
		, [menuRef, setHover]
	)

	useLayoutEffect(shouldHover, [menuRef, setHover])
	useResize(shouldHover)

	let [submenu, setSubmenu] = useState<ReactElement | null>(null) 
	let {
		children,
		icon: hasIcon,
		submenu: hasSubmenu,
		replace = false,
		className = '',
		style = {}
	} = props

	function handleSetSubmenu(submenu: ReactElement) {

		let BackIcon = (
			<IconWrapper>
				<ArrowBack />
			</IconWrapper>
		)

		function handleBack(e: MouseEvent) {
			e.stopPropagation()
			setSubmenu(null)
		}

		let BackItem = (
			<Fragment>
				<MenuItem onClick={handleBack} hasIcon={hasIcon} icon={BackIcon}>
					<MenuItemTitle>Back</MenuItemTitle>
				</MenuItem>
				<Divider />
			</Fragment>
		)

		let menu = cloneElement(submenu, {
			children: appendItem(submenu.props.children, BackItem)
		}) as ReactElement

		setSubmenu(menu)
	}

	let _children = useMemo(() => Children.map(children, node => {
		let menu = (node as JSX.Element)
		return cloneElement(menu, {
			hasSubmenu: hasSubmenu,
			hasIcon: hasIcon,
			replace: replace || !hover,
			setSubmenu: handleSetSubmenu,
		})
	}), [children, hasSubmenu, hover])

	if (submenu) {
		return (
			<div
				ref={ref}
				onContextMenu={e => e.preventDefault()}
				className={className}
				style={style}
				onClick={props.onClick}
			>
				{ submenu }
			</div>
		)
	}

	return (
		<StyledMenu
			ref={ref}
			onContextMenu={e => e.preventDefault()}
			className={className}
			style={style}
			onClick={props.onClick}
		>
			{ _children }
		</StyledMenu>
	)
})

type MenuItemProps = {
	children?: JSX.Element | Array<JSX.Element>,
	onClick?: (e: MouseEvent) => void,
	hasSubmenu?: boolean,
	hasIcon?: boolean,
	icon?: JSX.Element,
	replace?: boolean ,
	setSubmenu?: (e: ReactElement) => void,
}

export let MenuItem = (props: MenuItemProps) => {
	let {
		children,
		onClick,
		hasSubmenu,
		hasIcon,
		icon,
		replace,
		setSubmenu,
	} = props
	
	let _children = useMemo<Array<ReactElement>>(
		() => Children.toArray(children) as Array<ReactElement>,
		[children, hasSubmenu, hasIcon]
	)

	let title = useMemo(
		() => _children.find(node => node.type === MenuItemTitle),
		[children, hasSubmenu, hasIcon]
	)

	let submenuRef = useRef<HTMLElement | null>(null)
	let itemRef = useRef(null)

	function getSubmenu() {
		let items = _children
			.filter(node => node.type === Menu)

		if (items.length === 0) {
			return null
		}

		return cloneElement(items[0], {
			ref: submenuRef
		})
	}

	let submenu = useMemo(getSubmenu, [_children])

	if (!title) {
		return null
	}

	let Title = cloneElement(title, {
		key: 'title',
		children: submenu === null ? title.props.children : pushArrow(title.props.children),
		hasSubmenu: hasSubmenu,
		hasIcon: hasIcon,
		cursor: (onClick || replace) ? 'pointer' : 'default',
		onClick: (e: MouseEvent) => {
			if (replace && submenu) {
				setSubmenu && setSubmenu(submenu)
			}

			if (submenu) {
				e.stopPropagation()
			}

			if (title && title.props.onClick) {
				title.props.onClick(e)
			}

		}
	})

	function handleMouseOver(e: MouseEvent) {
		if (replace) return
		if (!submenuRef.current) return

		let target = e.target as HTMLElement
		let node = submenuRef.current
		let boundingClientRect = node.getBoundingClientRect()
		let targetRect = target.getBoundingClientRect()

		let { top, left } = getSubmenuPosition(boundingClientRect, targetRect)
		node.style.top = top
		node.style.left = left
		node.style.opacity = '1'
	}
	
	return (
		<StyledMenuItem onClick={onClick} onMouseEnter={handleMouseOver} ref={itemRef}>
			{ icon && 
				<IconWrapper>
					{ icon }
				</IconWrapper>
			}
			{ Title }
			{ !replace && submenu }
		</StyledMenuItem>
	)
}

function pushArrow(children: JSX.Element) {
	let _children = Children.toArray(children)
	let arrow = (
		<span className='arrow_right' key='arrow_right'>
			<ArrowRight key='arrow_right' />
		</span>
	)
	_children.push(arrow)
	return _children
}

function appendItem(children: JSX.Element, item: JSX.Element) {
	let _children = Children.toArray(children)
	return [item, ..._children]
}

type IconWrapperProps = {
	children?: ReactNode,
}

export let Divider = () => {
	return (
		<hr className={divider} />
	)
}

let IconWrapper = ({ children }: IconWrapperProps) => {
	return (
		<span className={iconWrapper}>
			{ children }
		</span>
	)
}
