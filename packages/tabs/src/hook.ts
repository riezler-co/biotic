import { useEffect
			 , useCallback
			 , useState
			 , useRef
			 , SyntheticEvent
			 } from 'react'

import _ from 'lodash'

import { atom
			 , atomFamily
			 , useSetRecoilState
			 , useRecoilState
			 , useRecoilValue
			 , useRecoilCallback
			 , RecoilState
			 , SerializableParam
			 , SetterOrUpdater
			 , Loadable
			 } from 'recoil'

import { useDebounce } from '@biotic-ui/std'

import { isOpen
			 , getStaticTabs
			 , getTabIndex
			 , getNextIndex
			 , OnCloseTab
			 } from './utils'

import type {
				 TabsState
			 , TabItem
			 , ActiveState
			 , TabState
			 , ScrollState
			 , EventCallback
			 , TabsHistory
			 } from './utils'

export let tabsState = atom<TabsState>(
	{ key: 'tabs'
	, default:
			{ items: []
			, length: 0
			, ids: {}
			, staticItems: []
			}
	}
)

const DEFAULT_ACTIVE: ActiveState = 
	{ index: 0
	, type: ''
	, id: ''
	}

export let tabsHistory = atom<TabsHistory>(
	{ key: 'tabs_history'
	, default:
			{ items: []
			, currentIndex: 0
			}		
	}
)

export function useTabs(): TabsState {
	let tabs = useRecoilValue(tabsState)
	return tabs
}

export function useActiveState(): ActiveState | null {
	let history = useRecoilValue(tabsHistory)
	let active = history.items[history.currentIndex]
	return active ? active : null
}

export function useSetTabHistory() {
	let setHistory = useSetRecoilState(tabsHistory)
	return setHistory
}

export function useTabHistory() {
	let [tabs, setTabs] = useRecoilState(tabsState)
	let [history, setHistory] = useRecoilState(tabsHistory)
	let active = useActiveState()

	let push = useCallback(config => {

		let tab =
			{ ...config
			, closable: true
			, isStatic: false
			}

		let historyCallback = (index: number, type: string, id: string) => (history: TabsHistory): TabsHistory => {
			let entry = { index, type, id}
			let isLast = history.currentIndex !== history.items.length - 1

			let items = isLast
				? [...history.items, entry]
				: [ ...history.items.slice(0, history.currentIndex + 1)
					, entry
					]

			let currentIndex = items.length - 1

			return { currentIndex, items }
		}

		if (isOpen(tabs.ids, tab.id)) {

			let index = getTabIndex(tabs, tab.id)
			let staticTabs = getStaticTabs(tabs)
			let { type, id } = tabs.items[index]
			return setHistory(historyCallback(index + staticTabs, type, id))
		}

		let items = [...tabs.items, tab]
		let length = tabs.length + 1
		let ids = { ...tabs.ids, [tab.id]: true }
		
		setTabs(tabs => ({ ...tabs, items , length, ids }))
		
		let index = length - 1
		let { type, id } = tab
		setHistory(historyCallback(index, type, id))
	}, [tabs, setTabs, history, setHistory])


	let replace = useCallback((tab) => {
		setHistory(history => {
			let last = history.items.length - 1
			let items =
				[ ...history.items.slice(0, last)
				, tab
				]

			return { ...history, items }
		})
	}, [setHistory])

	return { push, replace, active }
}

export function useCloseTab() {
	let [tabs, setTabs] = useRecoilState(tabsState)
	let { active, replace } = useTabHistory()

	let close = useCallback((id) => {

		if (!isOpen(tabs.ids, id) || active === null) {
			return
		}

		let staticTabs = getStaticTabs(tabs)
		let index = getTabIndex(tabs, id)
		let absoluteIndex = index + staticTabs

		let items = tabs
			.items
			.filter(tab => tab.id !== id)

		let ids = 
			{ ...tabs.ids
			, [id]: undefined
			}

		let length = Math.max(tabs.length - 1, 0)

		setTabs(tabs => ({ ...tabs, items, ids, length }))

		OnCloseTab.push(id)

		if (absoluteIndex > active.index) {
			return
		}

		if (active.index === absoluteIndex) {

			let nextIndex = getNextIndex(items, staticTabs, active)
			let activeTab = items[nextIndex - staticTabs]

			if (activeTab === undefined && staticTabs === 0) {
				replace(DEFAULT_ACTIVE)
			} else if (activeTab === undefined && staticTabs > 0) {
				let tab = _.last(tabs.staticItems) ?? DEFAULT_ACTIVE

				replace(
					{ id: tab.id
					, index: staticTabs - 1
					, type: tab.type
					}
				)
			} else {
				replace(
					{ id: activeTab.id
					, index: nextIndex
					, type: activeTab.type
					}
				)
			}

		}

		if (absoluteIndex < active.index) {
			replace(
				{ ...active
				, index: active.index - 1
				}
			)
		}
	}, [tabs, active, replace])

	return { close }
}

export function useOnTabClose(id: string, cb: EventCallback) {
	let fn = useRef(cb)

	useEffect(() => {
		fn.current = cb
	})

	useEffect(() => {
		return OnCloseTab.subscribe(closedId => {
			if (closedId === id) {
				fn.current(id)
			}
		})
	}, [id])
}

export function useDefaultTab({ index, type, id }: ActiveState) {
	let setHistory = useSetTabHistory()
	useEffect(() => {
		setHistory(history => {
			let entry = { index, type, id }
			let items = [...history.items, entry]
			let currentIndex = items.length - 1
			return { currentIndex, items }
		})
	}, [])
}

let makeTabState: (<T>(id: string) => RecoilState<T>) = atomFamily<any | null, string>(
	{ key: 'tab'
	, default: {}
	}
)

type UseTabState<T> = 
	[ T | null
	, SetterOrUpdater<T>
	]

export function useTabState<T extends SerializableParam>(
		id: string
	, defaultState = null
): UseTabState<T> {
	let tabState = makeTabState<T>(id)
	let [state, setState] = useRecoilState<T>(tabState)

	return [
			state ? state : defaultState
		, setState
	]
}

let makeScrollState = atomFamily<ScrollState, string>(
	{ key: 'tab_scroll'
	, default: { top: 0, left: 0 }
	}
)

type UseScrollState =
	[ () => ScrollState
	, (e: SyntheticEvent) => void
	, () => void
	]

export function useScrollState(id: string): UseScrollState {
	let scrollState = makeScrollState(id)
	let setScroll = useSetRecoilState(scrollState)
	let handleSetScroll = useDebounce(({ scrollTop, scrollLeft }) => {
		setScroll(
			{ top: scrollTop
			, left: scrollLeft
			}
		)
	}, 50, [setScroll], { leading: false, trailing: true })

	function handelScroll(e: SyntheticEvent) {

		let target = e.target as HTMLElement

		if(target.id !== id) {
			return
		}
		
		let { scrollTop, scrollLeft } = target
		handleSetScroll({scrollTop, scrollLeft})
	}

	let getScroll = useRecoilCallback<any, ScrollState>(({ snapshot }) => (): ScrollState => {
		let { state, contents } = snapshot.getLoadable(scrollState)
		console.log({ state, contents, id })
		if (state === 'hasValue') {
			console.log('HAS_VALUE')
			return (contents as ScrollState)
		}

		return { top: 0, left: 0 }
	}, [id, scrollState])

	let cleanUp = useCallback(() => {
		setScroll({ top: 0, left: 0 })
	}, [id])

	return [
			getScroll
		, handelScroll
		, cleanUp
		]
}

export function useRestoreScroll(currentId: string) {
	let scroll = useRef<boolean>(true)
	let [getScroll] = useScrollState(currentId)

	useEffect(() => {
		if (scroll.current === false) {
			scroll.current = true
		}
	}, [currentId])

	return (node: HTMLElement | null) => {
		if (scroll.current && node) {
			scroll.current = false
			let { top, left } = getScroll()
			node.scrollTop = top
			node.scrollLeft = left
		}
	}
}
