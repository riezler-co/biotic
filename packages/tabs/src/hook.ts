import {
	useEffect,
	useCallback,
	useRef,
	SyntheticEvent
} from 'react'

import {
	bosonFamily,
	useBosonValue,
	useSetBoson,
	useBoson,
	SetterOrUpdater,
} from '@biotic-ui/boson'

import { useDebounce } from '@biotic-ui/std'

import {
	isOpen,
	getStaticTabs,
	getTabIndex,
	getNextIndex,
	last
} from './utils'

import type {
	TabsState,
	TabItem,
	ActiveState,
	ScrollState,
	EventCallback,
	TabsHistory
} from './utils'

export const DEFAULT_GROUP = 'default'


let CloseListener = new Map<string, (id: string) => void>()

export let makeTabsState = bosonFamily<[string], TabsState>(group => {
	return {
		key: `tabs:${group}`,
		defaultValue: {
			items: [],
			length: 0,
			ids: {},
			staticItems: []
		}
	}
})

const DEFAULT_ACTIVE: ActiveState = {
	index: 0,
	type: '',
	id: ''
}

export let makeTabsHistory = bosonFamily<[string], TabsHistory>(group => {
	return {
		key: `tabs_history:${group}`,
		defaultValue: {
			items: [],
			currentIndex: 0,
		}		
	}
})

export function useTabs(group = DEFAULT_GROUP): TabsState {
	let tabsState = makeTabsState(group)
	let tabs = useBosonValue(tabsState)
	return tabs
}

export function useActiveState(group = DEFAULT_GROUP): ActiveState | null {
	let tabsHistory = makeTabsHistory(group)
	let history = useBosonValue(tabsHistory)
	let active = history.items[history.currentIndex]
	return active ? active : null
}

export function useSetTabHistory(group = DEFAULT_GROUP) {
	let tabsHistory = makeTabsHistory(group)
	let setHistory = useSetBoson(tabsHistory)
	return setHistory
}

export function useTabHistory(group = DEFAULT_GROUP) {
	let tabsState = makeTabsState(group)
	let [tabs, setTabs] = useBoson(tabsState)
	let tabsHistory = makeTabsHistory(group)
	let [history, setHistory] = useBoson(tabsHistory)
	let active = useActiveState(group)

	let push = useCallback((config: TabItem) => {

		let tab = {
			...config,
			closable: true,
			isStatic: false,
		}

		let historyCallback = (index: number, type: string, id: string) => (history: TabsHistory): TabsHistory => {
			let entry = { index, type, id }
			let isLast = history.currentIndex !== history.items.length - 1

			let items = isLast
				? [...history.items, entry]
				: [ ...history.items.slice(0, history.currentIndex + 1), entry]

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
		let ids = { ...tabs.ids, [tab.id]: tab.id }
		
		setTabs(tabs => ({ ...tabs, items, length, ids }))
		
		let index = length - 1
		let { type, id } = tab
		setHistory(historyCallback(index, type, id))
	}, [tabs, setTabs, history, setHistory])


	let replace = useCallback((tab: ActiveState) => {
		setHistory(history => {
			let last = history.items.length - 1
			let items = [
				...history.items.slice(0, last),
				tab,
			]

			return { ...history, items }
		})
	}, [setHistory])

	let activate = useCallback((entry: ActiveState) => {
		setHistory(history => {
			let items = [...history.items, entry]
			let currentIndex = items.length - 1
			return { currentIndex, items }
		})
	}, [setHistory])

	return { push, replace, active, activate }
}


export function useCloseTab(group = DEFAULT_GROUP) {
	let tabsState = makeTabsState(group)
	let [tabs, setTabs] = useBoson(tabsState)
	let { active, replace } = useTabHistory(group)

	let close = useCallback((id: string) => {

		if (!isOpen(tabs.ids, id) || active === null) {
			return
		}

		let staticTabs = getStaticTabs(tabs)
		let index = getTabIndex(tabs, id)
		let absoluteIndex = index + staticTabs

		let items = tabs
			.items
			.filter(tab => tab.id !== id)

		let ids = {
			...tabs.ids,
		}

		delete tabs.ids[id]

		let length = Math.max(tabs.length - 1, 0)

		setTabs(tabs => ({ ...tabs, items, ids, length }))


		let _id = `${id}`
		makeTabState.cache.delete(_id)
		makeScrollState.cache.delete(`tab_panel:${id}`)

		let onClose = CloseListener.get(_id) 
		if (onClose) {
			onClose(_id)
			CloseListener.delete(_id) 
		}

		if (absoluteIndex > active.index) {
			return
		}

		if (active.index === absoluteIndex) {

			let nextIndex = getNextIndex(items, staticTabs, active)
			let activeTab = items[nextIndex - staticTabs]

			if (activeTab === undefined && staticTabs === 0) {
				replace(DEFAULT_ACTIVE)
			} else if (activeTab === undefined && staticTabs > 0) {
				let tab = last<TabItem>(tabs.staticItems) ?? DEFAULT_ACTIVE

				replace({
					id: tab.id,
					index: staticTabs - 1,
					type: tab.type
				})
			} else {
				replace({
					id: activeTab.id,
					index: nextIndex,
					type: activeTab.type
				})
			}

		}

		if (absoluteIndex < active.index) {
			replace({
				...active,
				index: active.index - 1
			})
		}
	}, [tabs, active, replace])

	return { close }
}

export function useOnTabClose(id: string, cb: EventCallback) {
	CloseListener.set(`${id}`, cb)
}


export function useDefaultTab({ index, type, id }: ActiveState, group = DEFAULT_GROUP) {
	let setHistory = useSetTabHistory(group)
	let active = useActiveState(group)
	useEffect(() => {
		if (active !== null) {
			return
		}

		setHistory(history => {
			let entry = { index, type, id }
			let items = [...history.items, entry]
			let currentIndex = items.length - 1
			return { currentIndex, items }
		})
	}, [])
}


export let makeTabState= bosonFamily<[string], any | null>(tab => {
	return {
		key: `tab:${tab}`,
		defaultValue: null
	}
})

type UseTabState<T> = [
	T | null,
	((nextState: SetterOrUpdater<T>) => void),
]

export function useTabState<T>(
	id: string,
	defaultState = null
): UseTabState<T> {
	let tabState = makeTabState(id)
	let [state, setState] = useBoson<T>(tabState)
	return [state ? state : defaultState, setState]
}

let makeScrollState = bosonFamily<[string], ScrollState>(scroll => {
	return {
		key: `scroll:${scroll}`,
		defaultValue: { top: 0, left: 0 }
	}
})

export let Scroll = makeScrollState

type UseScrollState = [
	() => ScrollState,
	(e: SyntheticEvent) => void,
	(id: string) => void,
]

export function useScrollState(id: string): UseScrollState {
	let scrollState = makeScrollState(id)
	let setScroll = useSetBoson(scrollState)
	
	let handleSetScroll = useDebounce(({ scrollTop, scrollLeft }: { scrollTop: number, scrollLeft: number }) => {
		setScroll({ top: scrollTop, left: scrollLeft })
	}, 50, [setScroll], { leading: false, trailing: true })

	function handelScroll(e: SyntheticEvent) {

		let target = e.target as HTMLElement

		if(target.id !== id) {
			return
		}
		
		let { scrollTop, scrollLeft } = target
		handleSetScroll({ scrollTop, scrollLeft })
	}

	let getScroll = useCallback((): ScrollState => {
		return scrollState.state.value
	}, [id, scrollState])

	let reset = useCallback((id: string) => {
		makeScrollState.cache.delete(id)
	}, [id])

	return [
		getScroll,
		handelScroll,
		reset,
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

export function useScroll(id: string) {
	let ref = useRestoreScroll(id)
	let [, onScroll] = useScrollState(id)
	return [onScroll, ref]
}