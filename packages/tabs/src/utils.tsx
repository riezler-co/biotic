
export type TabItem =
	{ closable: boolean
	; id: string
	; isStatic: boolean
	; title?: string
	; type: string
	}

export type TabsState =
	{ items: Array<TabItem>
	; length: number
	; ids: { [key:string]: string }
	; staticItems: Array<TabItem>
	}


export type ActiveState =
	{ index: number
	; type: string
	; id: string
	}

export type TabsHistory =
	{ items: Array<ActiveState>
	; currentIndex: number
	}

export type ScrollState =
	{ top: number
	; left: number
	}

export type TabState<T> = T

export type TabItems = Array<TabItem>

export function toTabObject(node: JSX.Element): TabItem {
	let props =
		{ closable: node.props.closable || false
		, id: node.props.id
		, isStatic: node.props.isStatic || true
		, title: node.props.title
		, type: node.props.type
		}

	return props
}

export type Ids = { [key:string]: string }

export function isOpen(ids: Ids, id: string): boolean {
	return ids[id] !== undefined
}

export function getTabIndex(tabs: TabsState, id: string) {
	return tabs
		.items
		.findIndex((tab: TabItem) => tab.id === id)
}

export function getStaticTabs(tabs: TabsState): number {
	return tabs.length - tabs.items.length
}

export function isStatic(node: JSX.Element): boolean {
	return node.props.isStatic !== false
}

export function getNextIndex(
		items: TabItems
	, staticTabs: number
	, active: ActiveState
): number {

	let itemIndex = active.index - staticTabs
	let nextIndex = items[itemIndex]
		? active.index
		: active.index - 1

	if (nextIndex === -1 && staticTabs > 1) {
		return staticTabs - 1
	}

	return nextIndex
}

let makeId = (): (() => number) => {
	let id = 0
	return (): number => {
		let tmp = id
		id = id + 1
		return tmp
	}
}

export type EventCallback = (id: string) => void; 

type $Event =
	{ subscribe: (fn: EventCallback) => () => void
	; push: (id: string) => void
	}

export let Event = (): $Event => {
	let getId = makeId()
	let subscribers: Array<{ fn: EventCallback; id: number }> = []

	let subscribe = (fn: EventCallback) => {
		let id = getId()
		subscribers.push({ fn, id })
		return () => {
			subscribers = subscribers.filter(s => s.id !== id)
		}
	}

	let push = (payload: string) => {
		subscribers.forEach(sub => {
			sub.fn(payload)
		})
	}

	return {
			subscribe
		, push
	}
}

export let OnCloseTab: $Event = Event()