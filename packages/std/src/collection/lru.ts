
type LRUConfig<Item> = {
	size: number;
}

export class LRU<Item = any> {

	readonly cacheSize: number

	private items = new Map<string, Item>()
	private order: Array<string>

	constructor(config: LRUConfig<Item>) {
		this.cacheSize = config.size
		this.order = []
	}

	get(key: string): Item | undefined {

		if (this.items.has(key)) {
			this.order = this.moveToBack(key)
		}

		return this.items.get(key)
	}

	set(key: string, item: Item): LRU<Item> {

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

	has(key: string): boolean {
		return this.items.has(key)
	}

	delete(key: string): boolean {

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

	forEach(cb: (value: Item, key: string, lru: LRU<Item>) => any) {
		this.items.forEach((value, key) => cb(value, key, this))
	}

	get size(): number {
		return this.items.size
	}

	private moveToBack(key: string) {
		let index = this.order.indexOf(key)
		return [
			...this.order.slice(0, index),
			...this.order.slice(index + 1),
			this.order[index],
		]
	}
}