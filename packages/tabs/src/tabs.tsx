import {
	Children,
	useMemo,
	useEffect,
	ReactElement,
	createContext,
	useContext,
    cloneElement,
    HTMLAttributes,
} from 'react'

import { scrollbar } from '@biotic-ui/leptons'
import { StyledTabs, StyledTabBar, StyledTabContent } from './styled'

import { useSetBoson } from '@biotic-ui/boson'

import {
	makeTabsState,
	useScrollState,
	useRestoreScroll,
	useCloseTab,
	useTabHistory,
	useActiveState
} from './hook'

import {
	toTabObject,
	isStatic,
	PanelIdCtx,
} from './utils'
import { cx } from '@emotion/css'

export let TabsCtx = createContext('default')

export function useGroup() {
	return useContext(TabsCtx)
}


type TabProps
	= React.HTMLAttributes<HTMLElement>
	& {
		children: JSX.Element | Array<JSX.Element>;
		group?: string;
 	} 

export function Tabs({ children, group = 'default', ...props }: TabProps) {
	return (
		<div {...props} className={cx(StyledTabs, props.className)}>
			<TabsCtx.Provider value={group}>
				{ children }
			</TabsCtx.Provider>
		</div>
	)
}


type TabBarProps = React.HTMLAttributes<HTMLElement> 

export function TabBar({ children, ...props }: TabBarProps) {
	let group = useContext(TabsCtx)
	let tabsState = makeTabsState(group)
	let setTabs = useSetBoson(tabsState)
	let { active, ...history } = useTabHistory(group)
	let closeTab = useCloseTab(group)

	let _children = useMemo(() => {
		return Children.map(children, (node, index) => {
			let elm = (node as ReactElement)
			return cloneElement(elm, {
				onClick: () => {
					history.activate({
						index,
						type: elm.props.type,
						id: elm.props.id
					})
				},

				onClose: () => {
					closeTab.close(elm.props.id)
				},

				isActive: active && active.id === elm.props.id
			})
		})
	}, [children, active]) ?? []

	let length = _children.length
	useEffect(() => {
		let staticItems = _children
			.filter(isStatic)
			.map(toTabObject)

		setTabs(tabs => ({ ...tabs, length, staticItems }))
	}, [length])

	return (
		<header {...props} className={cx(StyledTabBar, props.className)}>
			{ _children }
		</header>
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

	return cloneElement(panel, {
		key: active === null ? '' : active.id
	})
}

type TabPanelProps
	= HTMLAttributes<HTMLElement>
	& {
		children: JSX.Element,
		scrollGroup?: string,
		type: string,
	}


export function TabPanel({ children, scrollGroup, ...props }: TabPanelProps) {
	let group = useContext(TabsCtx)
	let active = useActiveState(group)
	let _child = Children.only(children)

	let id = useMemo(() => {
		if(active === null) {
			return ''
		}

		if (scrollGroup) {
			return `${scrollGroup}::${active.id}`	
		}
		
		return active.id
	}, [active, scrollGroup])

	let child = cloneElement(_child, { id })
	let tabId = `tab_panel:${id}`
	let [, setScroll] = useScrollState(tabId)
	let ref = useRestoreScroll(tabId)

	return (
		<PanelIdCtx.Provider value={id}>
			<div
				ref={ref}
				id={tabId}
				onScroll={setScroll}
				{...props}
				className={cx(StyledTabContent, scrollbar, props.className)}
			>
				{ child }
			</div>
		</PanelIdCtx.Provider>
	)
}