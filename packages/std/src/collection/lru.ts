
type LRUConfig = {
	size: number;
}

export class LRU<Item = any, Key = string> {

	readonly cacheSize: number

	private items = new Map<Key, Item>()
	private order: Array<Key>

	constructor(config: LRUConfig) {
		this.cacheSize = config.size
		this.order = []
	}

	get(key: Key): Item | undefined {

		if (this.items.has(key)) {
			this.order = this.moveToBack(key)
		}

		return this.items.get(key)
	}

	set(key: Key, item: Item): LRU<Item, Key> {

		if (this.items.has(key)) {
			this.order = this.moveToBack(key)
		} else {
			this.order.push(key)
			if (this.order.length > this.cacheSize) {
				let remove = this.order.shift()
				this.items.delete(remove!)
			}
		}

		this.items.set(key, item)

		return this
	}

	has(key: Key): boolean {
		return this.items.has(key)
	}

	delete(key: Key): boolean {

		if (this.items.has(key)) {
			this.items.delete(key)
			this.order = this.order.filter(k => k !== key)
			return true
		}

		return false
	}

	clear() {
		this.items.clear()
		this.order = []
	}

	keys() {
		return this.order
	}

	values() {
		return this.items.values()
	}

	entries() {
		return this.items.entries()
	}

	forEach(cb: (value: Item, key: Key, lru: LRU<Item, Key>) => any) {
		this.items.forEach((value, key) => cb(value, key, this))
	}

	get size(): number {
		return this.items.size
	}

	private moveToBack(key: Key) {
		let index = this.order.indexOf(key)
		return [
			...this.order.slice(0, index),
			...this.order.slice(index + 1),
			this.order[index],
		]
	}
}