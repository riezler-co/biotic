import React
		 , { Children
		   , useMemo
		   , useEffect
		   , useRef
		   , useState
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

export function Tabs({ children }) {
	return (
		<StyledTabs>
			{ children }
		</StyledTabs>
	)
}

export function TabBar({ children }) {
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

export function TabContent({ children, fallback = null }) {
	let [active] = useRecoilState(activeState)

	let panel = useMemo(() => {
		let _children = Children.toArray(children)

		let getNode = node =>
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

export function TabPanel({ children }) {
	let [active] = useRecoilState(activeState)
	let child = React.cloneElement(children, {
		id: active.id
	})
	let [, setState] = useTabState(active.id)
	let [scrollContainer, setScrollContainer] = useState(null)
	let id = `tab_panel:${active.id}`
	let [, setScroll, cleanScroll] = useScrollState(id)
	let ref = useRestoreScroll(id)

	useOnTabClose(active.id, () => {
		cleanScroll()
		setState(undefined)
	})

	return (
		<StyledTabContent id={id} onScroll={setScroll} ref={ref}>
			{ child }
		</StyledTabContent>
	)
}