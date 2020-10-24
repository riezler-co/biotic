import React from 'react'
import { Children
		   , useMemo
		   , useEffect
		   , useRef
		   , useState
		   , ReactElement
		 	 } from 'react'

import { StyledTabs
			 , StyledTabBar
			 , StyledTabContent
			 } from './styled'

import { useRecoilState } from 'recoil'

import { tabsState
			 , useScrollState
			 , useRestoreScroll
			 , useCloseTab
			 , useOnTabClose
			 , useTabState
			 , useTabHistory
			 , useActiveState
			 } from './hook'

import { toTabObject
			 , isStatic
			 , OnCloseTab
			 } from './utils'

type TabProps =
 	{ children: JSX.Element | Array<JSX.Element>
 	} 

export function Tabs({ children }: TabProps) {
	return (
		<StyledTabs>
			{ children }
		</StyledTabs>
	)
}


type TabBarProps =
	{ children: JSX.Element | Array<JSX.Element>
	} 

export function TabBar({ children }: TabBarProps) {
	let [, setTabs] = useRecoilState(tabsState)
	let { active, ...history } = useTabHistory()
	let closeTab = useCloseTab()

	let _children = useMemo(() => {
		return Children.map(children, (node, index) => {
			return React.cloneElement(node,
				{ onClick: () => {
						history.push(
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
		<StyledTabBar as='ul'>
			{ _children }
		</StyledTabBar>
	)
}

type TabContentProps =
	{ children: JSX.Element | Array<JSX.Element>
	; fallback: ReactElement | null
	} 

export function TabContent({ children, fallback = null }: TabContentProps) {
	let active = useActiveState()

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

type TabPanelProps =
	{ children: JSX.Element 
	}

export function TabPanel({ children }: TabPanelProps) {
	let active = useActiveState()
	let _child = React.Children.only(children)

	let id = active === null ? '' : active.id
	console.log({ id })
	let child = React.cloneElement(_child, { id })
	let [, setState] = useTabState(id, null)
	let [scrollContainer, setScrollContainer] = useState(null)
	let tabId = `tab_panel:${id}`
	let [, setScroll, cleanScroll] = useScrollState(id)
	let ref = useRestoreScroll(tabId)

	useOnTabClose(id, () => {
		cleanScroll()
		setState(null)
	})

	return (
		<StyledTabContent id={tabId} onScroll={setScroll} ref={ref}>
			{ child }
		</StyledTabContent>
	)
}