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

import { activeState
			 , tabsState
			 , useScrollState
			 , useRestoreScroll
			 , useCloseTab
			 , useOnTabClose
			 , useTabState
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
	let [active, setActive] = useRecoilState(activeState)
	let closeTab = useCloseTab()

	let _children = useMemo(() => {
		return Children.map(children, (node, index) => {
			return React.cloneElement(node,
				{ onClick: () => {
						setActive(
							{ index
							, type: node.props.type
							, id: node.props.id
							}
						)
					}
				
				, onClose: () => {
						closeTab.close(node.props.id)
					}

				, isActive: active.id === node.props.id
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
	let [active] = useRecoilState(activeState)

	let panel = useMemo<JSX.Element | undefined>(() => {
		let _children = Children.toArray(children) as Array<JSX.Element>

		let getNode = (node: JSX.Element): boolean =>
			node.props.type === active.type

		return _children.find(getNode)
	}, [children, active])

	if (!panel) {
		return fallback
	}

	return React.cloneElement(panel, {
		key: active.id
	})
}

type TabPanelProps =
	{ children: JSX.Element 
	}

export function TabPanel({ children }: TabPanelProps) {
	let [active] = useRecoilState(activeState)
	let _child = React.Children.only(children)
	let child = React.cloneElement(_child, {
		id: active.id
	})
	let [, setState] = useTabState(active.id, null)
	let [scrollContainer, setScrollContainer] = useState(null)
	let id = `tab_panel:${active.id}`
	let [, setScroll, cleanScroll] = useScrollState(id)
	let ref = useRestoreScroll(id)

	useOnTabClose(active.id, () => {
		cleanScroll()
		setState(null)
	})

	return (
		<StyledTabContent id={id} onScroll={setScroll} ref={ref}>
			{ child }
		</StyledTabContent>
	)
}