
import React from 'react'

import { Children
			 , useMemo
			 , useState
			 , useEffect
			 , useLayoutEffect
			 , useRef
			 , useCallback
			 , ReactElement
			 , MouseEvent
			 } from 'react'

import styled, { css } from 'styled-components'
import ArrowRight from './arrow_right'
import { getSubmenuPosition } from './utils'
import ArrowBack from './arrow_back'
import { useCombinedRefs, useResize } from '@biotic-ui/std'
import { StyledMenu, StyledMenuItem, MenuItemTitle } from './styled'

type Props =
	{ children: JSX.Element | Array<JSX.Element>
  ; icon?: boolean
  ; submenu?: boolean
  ; replace?: boolean
  ; className?: string
  ; style?: { [key:string]: any }
  ; onClick?: (e: MouseEvent) => void
  }

export function Menu (props: Props) {
	let [menuRef, setMenuRef] = useState<HTMLDivElement | HTMLUListElement | null>(null)
	let [hover, setHover] = useState(true)

	let shouldHover = useCallback(
		() => {
			if (menuRef === null) return

			let { width } = menuRef.getBoundingClientRect()
			let { innerWidth } = window
			let parentNode = menuRef.parentNode as HTMLElement

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
	let { children
		  , icon: hasIcon
		  , submenu: hasSubmenu
		  , replace = false
		  , className = ''
		  , style = {}
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
			<React.Fragment>
				<MenuItem onClick={handleBack} hasIcon icon={BackIcon}>
					<MenuItemTitle>Back</MenuItemTitle>
				</MenuItem>
				<Divider />
			</React.Fragment>
		)

		let menu = React.cloneElement(submenu, {
			children: appendItem(submenu.props.children, BackItem)
		}) as ReactElement

		setSubmenu(menu)
	}

	let _children = useMemo(() => Children.map(children, node => {
		return React.cloneElement(node, {
			hasSubmenu: hasSubmenu,
			hasIcon: hasIcon,
			replace: replace || !hover,
			setSubmenu: handleSetSubmenu,
		})
	}), [children, hasSubmenu, hover])

	if (submenu) {
		return (
			<div ref={setMenuRef}
					 onContextMenu={e => e.preventDefault()}
					 className={className}
					 style={style}
					 onClick={props.onClick}>
				{ submenu }
			</div>
		)
	}

	return (
		<StyledMenu ref={setMenuRef}
							  onContextMenu={e => e.preventDefault()}
							  className={className}
							  style={style}
							  onClick={props.onClick}>
			{ _children }
		</StyledMenu>
	)
}

type MenuItemProps =
	{ children?: JSX.Element | Array<JSX.Element>
	; onClick?: (e: MouseEvent) => void 
	; hasSubmenu?: boolean
	; hasIcon?: boolean
	; icon?: JSX.Element
	; replace?: boolean 
	; setSubmenu?: (e: ReactElement) => void
	}

export let MenuItem = (props: MenuItemProps) => {
	let { children
			, onClick
			, hasSubmenu
			, hasIcon
			, icon
			, replace
			, setSubmenu
			} = props
	let _children = useMemo<Array<ReactElement>>(
			() => Children.toArray(children) as Array<ReactElement>
		, [children, hasSubmenu, hasIcon]
	)
	let title = useMemo(() => _children.find(node => node.type === MenuItemTitle), [children, hasSubmenu, hasIcon])
	let submenuRef = useRef<HTMLElement | null>(null)
	let itemRef = useRef(null)

	function getSubmenu() {
		let items = _children
			.filter(node => node.type === Menu)

		if (items.length === 0) {
			return null
		}

		return React.cloneElement(items[0], {
			ref: submenuRef
		})
	}

	let submenu = useMemo(getSubmenu, [_children])

	if (!title) {
		throw new Error('missing title')
	}

	let Title = React.cloneElement(title, {
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

export let Divider = styled.hr`
	margin: 4px 0;
	background: var(--menu-border-color, #e9e9e9);
	border: none;
	height: 1px;
`

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

let IconWrapper = styled.span`
	position: absolute;
	left: 0;
	width: 2em;
	height: 1.62em;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 2;
	height: 100%;

	svg {
		width: 1.1em;
		height: 1.1em;
	}
`