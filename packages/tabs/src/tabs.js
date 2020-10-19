import React, { Children, useMemo, useEffect } from 'react'
import { StyledTabs
			 , StyledTabBar
			 , StyledTabContent
			 } from './styled'
import { useRecoilState } from 'recoil'
import { activeState, tabsState } from './hook'

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

	let _children = useMemo(() => {
		return Children.map(children, (node, index) => {
			return React.cloneElement(node, {
				onClick: () => {
					setActive({ index, type: node.props.type })
				},

				isActive: active.index === index
			})
		})
	}, [children])

	let length = _children.length
	useEffect(() => {
		setTabs(tabs => ({ ...tabs, length }))
	}, [length])

	return (
		<StyledTabBar>
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

	return (
		<StyledTabContent>
			{ panel ? panel : fallback }
		</StyledTabContent>
	)
}

export function TabPanel({  children }) {
	return children
}