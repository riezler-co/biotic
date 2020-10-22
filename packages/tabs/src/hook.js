import { useEffect
			 , useCallback
			 , useState
			 , useRef
			 } from 'react'

import _ from 'lodash'

import { atom
			 , atomFamily
			 , useSetRecoilState
			 , useRecoilState
			 , useRecoilValue
			 , useRecoilCallback
			 } from 'recoil'

import { useDebounce } from '@biotic-ui/std'

import { isOpen
			 , getStaticTabs
			 , getTabIndex
			 , getNextIndex
			 , OnCloseTab
			 } from './utils'

export let tabsState = atom(
	{ key: 'tabs'
	, default:
			{ items: []
			, length: 0
			, ids: {}
			, staticItems: []
			}
	}
)

const DEFAULT_ACTIVE = 
	{ index: 0
	, type: ''
	, id: null
	}

export let activeState = atom(
	{ key: 'active'
	, default: DEFAULT_ACTIVE	
	}
)

export function useTabs() {
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
		
		setTabs({ items , length, ids })
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

		setTabs({ items, ids, length })

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
				let tab = _.last(tabs.staticItems)
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

export function useOnTabClose(id, cb) {
	let fn = useRef(cb)

	useEffect(() => {
		fn.current = cb
	})

	useEffect(() => {
		return OnCloseTab.subscribe(closedId => {
			if (closedId === id) {
				fn.current()
			}
		})
	}, [id])
}

export function useDefaultTab({ index, type, id }) {
	let setActive = useSetRecoilState(activeState)
	useEffect(() => {
		setActive({ index, type, id })
	}, [])
}

let makeTabState = atomFamily(
		{ key: 'tab'
		, default: undefined
		}
	)

export function useTabState(id, defaultState = null) {
	let tabState = makeTabState(id)
	let [state, setState] = useRecoilState(tabState)

	function handleState(fn_obj) {
		if (typeof fn_obj === 'function') {
			if (state === undefined) {
				let newState = fn(defaultState)
				setState(newState)
			} else {
				setState(fn_obj)
			}
		} else {
			setState(fn_obj)
		}
	}

	return [
			state ? state : defaultState
		, handleState
	]
}

let makeScrollState = atomFamily(
	{ key: 'tab_scroll'
	, default: { top: 0, left: 0 }
	}
)

export function useScrollState(id) {
	let scrollState = makeScrollState(id)
	let setScroll = useSetRecoilState(makeScrollState(id))
	let handleSetScroll = useDebounce(({ scrollTop, scrollLeft }) => {
		setScroll(
			{ top: scrollTop
			, left: scrollLeft
			}
		)
	}, 50, [setScroll], { leading: false, trailing: true })

	function handelScroll(e) {
		if(e.target.id !== id) {
			return
		}
		
		let { scrollTop, scrollLeft } = e.target
		handleSetScroll({scrollTop, scrollLeft})
	}

	let getScroll = useRecoilCallback(({ snapshot }) => () => {
		return snapshot.getLoadable(scrollState).contents
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

export function useRestoreScroll(currentId) {
	let scroll = useRef(true)
	let [getScroll] = useScrollState(currentId)

	useEffect(() => {
		if (scroll.current === false) {
			scroll.current = true
		}
	}, [currentId])

	return (node) => {
		if (scroll.current && node) {
			scroll.current = false
			let { top, left } = getScroll()
			node.scrollTop = top
			node.scrollLeft = left
		}
	}
}
