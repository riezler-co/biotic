import {
	useEffect,
	useCallback,
	useRef,
	SyntheticEvent
} from 'react'

import { atomFamily } from 'jotai/utils'

import {
	atom,
	useAtomValue,
	useSetAtom,
	useAtom,
	SetStateAction,
} from 'jotai'

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

export let makeTabsState = atomFamily((_group: string) => {
	return atom({
		items: [],
		length: 0,
		ids: {},
		staticItems: []
	} as TabsState)
})

const DEFAULT_ACTIVE: ActiveState = {
	index: 0,
	type: '',
	id: ''
}

export let makeTabsHistory = atomFamily((_group: string) => {
	return atom({
		items: [],
		currentIndex: 0,
	} as TabsHistory)
})

export function useTabs(group = DEFAULT_GROUP): TabsState {
	let tabsState = makeTabsState(group)
	let tabs = useAtomValue(tabsState)
	return tabs
}

export function useActiveState(group = DEFAULT_GROUP): ActiveState | null {
	let tabsHistory = makeTabsHistory(group)
	let history = useAtomValue(tabsHistory)
	let active = history.items[history.currentIndex]
	return active ? active : null
}

export function useSetTabHistory(group = DEFAULT_GROUP) {
	let tabsHistory = makeTabsHistory(group)
	let setHistory = useSetAtom(tabsHistory)
	return setHistory
}

export function useTabHistory(group = DEFAULT_GROUP) {
	let tabsState = makeTabsState(group)
	let [tabs, setTabs] = useAtom(tabsState)
	let tabsHistory = makeTabsHistory(group)
	let [history, setHistory] = useAtom(tabsHistory)
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
	let [tabs, setTabs] = useAtom(tabsState)
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

		delete ids[id]

		let length = Math.max(tabs.length - 1, 0)

		setTabs(tabs => ({ ...tabs, items, ids, length }))

		makeTabState.remove(id)
		Scroll.delete(`tab_panel:${id}`)

		let onClose = CloseListener.get(id) 
		if (onClose) {
			onClose(id)
			CloseListener.delete(id) 
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
	CloseListener.set(id, cb)
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


export let makeTabState = atomFamily((_tab: string) => {
	return atom(null as any | null)
})

type UseTabState<T> = [
	T,
	((nextState: SetStateAction<T>) => void),
]

export function useTabState<T>(
	id: string,
	defaultState: T,
): UseTabState<T> {
	let tabState = makeTabState(id)
	let [state, setState] = useAtom<T>(tabState)
	return [state ? state : defaultState, setState]
}

export let Scroll = new Map<string, ScrollState>()

type UseScrollState = [
	() => ScrollState,
	(e: SyntheticEvent) => void,
	(id?: string) => void,
]

export function useScrollState(id: string) {	
	let handleSetScroll = useDebounce((id: string, top: number, left: number) => {
		Scroll.set(id, { top, left })
	}, 50, [], { leading: false, trailing: true })

	function handelScroll(e: SyntheticEvent) {

		let target = e.target as HTMLElement

		if(target.id !== id) {
			return
		}
		
		let { scrollTop, scrollLeft } = target
		handleSetScroll(id, scrollTop, scrollLeft)
	}

	let getScroll = useCallback((): ScrollState => {
		return Scroll.get(id) ?? { top: 0, left: 0 }
	}, [id])

	let reset = useCallback((id?: string) => {
		if (id) {
			Scroll.delete(id)
		}
	}, [id])

	return { get: getScroll, set: handelScroll, reset }
}

export function useRestoreScroll(currentId: string) {
	let scroll = useRef<boolean>(true)
	let scrollState = useScrollState(currentId)

	useEffect(() => {
		if (scroll.current === false) {
			scroll.current = true
		}
	}, [currentId])

	return (node: HTMLElement | null) => {
		if (scroll.current && node) {
			scroll.current = false
			let { top, left } = scrollState.get()
			node.scrollTop = top
			node.scrollLeft = left
		}
	}
}

export function useScroll(id: string) {
	let ref = useRestoreScroll(id)
	let { set } = useScrollState(id)
	return [set, ref]
}