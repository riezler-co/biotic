
export function toTabObject(node) {
	let props =
		{ closable: node.props.closable || false
		, id: node.props.id
		, isStatic: node.props.isStatic || true
		, title: node.props.title
		, type: node.props.type
		}

	return props
}


export function isOpen(ids, id) {
	return ids[id] !== undefined
}

export function getTabIndex(tabs, id) {
	return tabs
		.items
		.findIndex(tab => tab.id === id)
}

export function getStaticTabs(tabs) {
	return tabs.length - tabs.items.length
}

export function isStatic(node) {
	return node.props.isStatic !== false
}

export function getNextIndex(items, staticTabs, active) {
	let itemIndex = active.index - staticTabs
	let nextIndex = items[itemIndex]
		? active.index
		: active.index - 1

	if (nextIndex === -1 && staticTabs > 1) {
		return staticTabs - 1
	}

	return nextIndex
}

let makeId = () => {
	let id = 0
	return () => {
		let tmp = id
		let id = id + 1
		return tmp
	}
}

export let Event = () => {
	let getId = makeId()
	let subscribers = []

	let subscribe = (fn) => {
		let id = getId()
		subscribers.push({ fn, id })
		return () => {
			subscribers = subscribers.filter(s => s.id !== id)
		}
	}

	let push = (payload) => {
		subscribers.forEach(sub => {
			sub.fn(payload)
		})
	}

	return {
			subscribe
		, push
	}
}

export let OnCloseTab = Event()