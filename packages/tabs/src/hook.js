import { useEffect, useCallback } from 'react'
import _ from 'lodash'
import { atom
			 , useSetRecoilState
			 , useRecoilState
			 , useRecoilValue
			 } from 'recoil'

export let tabsState = atom(
	{ key: 'tabs'
	, default:
			{ items: []
			, length: 0
			, ids: new Set()
			}
	}
)

export let activeState = atom(
	{ key: 'active'
	, default: { index: 0, type: '' }
	}
)

export function useTabs() {
	let tabs = useRecoilValue(tabsState)
	return tabs
}

export function useOpenTab() {
	let [tabs, setTabs] = useRecoilState(tabsState)
	let setActive = useSetRecoilState(activeState)

	let push = useCallback(tab => {

		if (isOpen(tabs.ids, tab.id)) {

			let index = getTabIndex(tabs, tab.id)
			let staticTabs = getStaticTabs(tabs)
			let item = tabs.items[index]

			return setActive(
				{ index: staticTabs + index
				, type: item.type
				}
			)
		}

		let items = [...tabs.items, tab]
		let length = tabs.length + 1
		let ids = { ...tabs.ids, [tab.id]: true }

		let active =
			{ index: length - 1
			, type: tab.type
			}
		
		setTabs({ items , length, ids })
		setActive(active)
	}, [tabs, setTabs, setActive])

	return { push }
}

export function useDefaultTab({ index, type }) {
	let setActive = useSetRecoilState(activeState)
	useEffect(() => {
		setActive({ index, type })
	}, [])
}

function isOpen(ids, id) {
	return ids[id] !== undefined
}

function getTabIndex(tabs, id) {
	return tabs
		.items
		.findIndex(tab => tab.id === id)
}

function getStaticTabs(tabs) {
	return tabs.length - tabs.items.length
}