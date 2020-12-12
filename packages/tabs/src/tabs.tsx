import React from 'react'
import {
	Children,
	useMemo,
	useEffect,
	useRef,
	useState,
	ReactElement,
	createContext,
	useContext,
} from 'react'

import {
	StyledTabs,
	StyledTabBar,
	StyledTabContent
} from './styled'

import { useRecoilState } from 'recoil'

import {
	makeTabsState,
	useScrollState,
	useRestoreScroll,
	useCloseTab,
	useOnTabClose,
	useTabState,
	useTabHistory,
	useActiveState
} from './hook'

import {
	toTabObject,
	isStatic,
	OnCloseTab,
	As
} from './utils'

export let TabsCtx = createContext('default')

export function useGroup() {
	return useContext(TabsCtx)
}


type TabProps
	= React.HTMLAttributes<HTMLElement>
	& As
	& { children: JSX.Element | Array<JSX.Element>
 		; group?: string
 		} 

export function Tabs({ children, group = 'default', as = 'div', ...props }: TabProps) {
	return (
		<StyledTabs as={as} {...props}>
			<TabsCtx.Provider value={group}>
				{ children }
			</TabsCtx.Provider>
		</StyledTabs>
	)
}


type TabBarProps
	= React.HTMLAttributes<HTMLElement>
	& As
	& { children: Array<JSX.Element> } 

export function TabBar({ children, as = 'ul', ...props }: TabBarProps) {
	let group = useContext(TabsCtx)
	let tabsState = makeTabsState(group)
	let [, setTabs] = useRecoilState(tabsState)
	let { active, ...history } = useTabHistory(group)
	let closeTab = useCloseTab(group)

	let _children = useMemo(() => {
		return Children.map(children, (node, index) => {
			let { isStatic = true } = node.props

			return React.cloneElement(node,
				{ onClick: () => {
						history.activate(
							{ index
							, type: node.props.type
							, id: node.props.id
							}
						)
					}
				
				, onClose: () => {
						closeTab.close(node.props.id)
					}

				, isActive: active && active.id === node.props.id
			})
		})
	}, [children, active])

	let length = _children.length
	useEffect(() => {
		let staticItems = _children
			.filter(isStatic)
			.map(toTabObject)

		setTabs(tabs => ({ ...tabs, length, staticItems }))
	}, [length])

	return (
		<StyledTabBar as={as} {...props}>
			{ _children }
		</StyledTabBar>
	)
}

type TabContentProps = {
	children: JSX.Element | Array<JSX.Element>;
	fallback: ReactElement | null;
} 

export function TabContent({ children, fallback = null }: TabContentProps) {
	let group = useContext(TabsCtx)
	let active = useActiveState(group)

	let panel = useMemo<JSX.Element | undefined>(() => {
		let _children = Children.toArray(children) as Array<JSX.Element>

		let getNode = (node: JSX.Element): boolean =>
			active !== null && node.props.type === active.type

		return _children.find(getNode)
	}, [children, active])

	if (!panel) {
		return fallback
	}

	return React.cloneElement(panel, {
		key: active === null ? '' : active.id
	})
}

type TabPanelProps
	= React.HTMLAttributes<HTMLElement>
	& As
	& {
		children: JSX.Element;
		scrollGroup?: string;
	}


export function TabPanel({ children, scrollGroup, as = 'div', ...props }: TabPanelProps) {
	let group = useContext(TabsCtx)
	let active = useActiveState(group)
	let _child = React.Children.only(children)

	let id = useMemo(() => {
		if(active === null) {
			return ''
		}

		if (scrollGroup) {
			return `${scrollGroup}::${active.id}`	
		}
		
		return active.id
	}, [active, scrollGroup])

	let child = React.cloneElement(_child, { id })
	let [, setState] = useTabState(id, null)
	let tabId = `tab_panel:${id}`
	let [, setScroll, cleanScroll] = useScrollState(tabId)
	let ref = useRestoreScroll(tabId)

	useOnTabClose(id, () => {
		cleanScroll()
		setState(null)
	})

	return (
		<StyledTabContent as={as} id={tabId} onScroll={setScroll} ref={ref} {...props}>
			{ child }
		</StyledTabContent>
	)
}