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

export let activeState = atom<ActiveState>(
	{ key: 'active'
	, default: DEFAULT_ACTIVE	
	}
)

export function useTabs(): TabsState {
	let tabs = useRecoilValue(tabsState)
	return tabs
}

export function useOpenTab() {
	let [tabs, setTabs] = useRecoilState(tabsState)
	let setActive = useSetRecoilState(activeState)

	let push = useCallback(config => {

		let tab =
			{ ...config
			, closable: true
			, isStatic: false
			}

		if (isOpen(tabs.ids, tab.id)) {

			let index = getTabIndex(tabs, tab.id)
			let staticTabs = getStaticTabs(tabs)
			let item = tabs.items[index]

			return setActive(
				{ index: staticTabs + index
				, type: item.type
				, id: item.id
				}
			)
		}

		let items = [...tabs.items, tab]
		let length = tabs.length + 1
		let ids = { ...tabs.ids, [tab.id]: true }

		let active =
			{ index: length - 1
			, type: tab.type
			, id: tab.id
			}
		
		setTabs(tabs => ({ ...tabs, items , length, ids }))
		setActive(active)
	}, [tabs, setTabs, setActive])

	return { push }
}

export function useCloseTab() {
	let [tabs, setTabs] = useRecoilState(tabsState)
	let [active, setActive] = useRecoilState(activeState)

	let close = useCallback((id) => {

		if (!isOpen(tabs.ids, id)) {
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
				setActive(DEFAULT_ACTIVE)
			} else if (activeTab === undefined && staticTabs > 0) {
				let tab = _.last(tabs.staticItems) ?? DEFAULT_ACTIVE

				setActive(
					{ id: tab.id
					, index: staticTabs - 1
					, type: tab.type
					}
				)
			} else {
				setActive(
					{ id: activeTab.id
					, index: nextIndex
					, type: activeTab.type
					}
				)
			}

		}

		if (absoluteIndex < active.index) {
			setActive(
				{ ...active
				, index: active.index - 1
				}
			)
		}
	}, [tabs, active])

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
	let setActive = useSetRecoilState(activeState)
	useEffect(() => {
		setActive({ index, type, id })
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
		
		if (state === 'hasValue') {
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
