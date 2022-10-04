import { LRU } from './lru'

describe('LRU Cache', () => {
	test('can evict item', () => {
		let cache = new LRU<string, number>({ size: 2 })
		cache.set(1, 'bar')
		cache.set(2, 'baz')

		expect(cache.get(1)).toEqual('bar')
		expect(cache.get(2)).toEqual('baz')

		cache.set(3, 'baz')
		expect(cache.has(1)).toEqual(false)
		expect(cache.has(2)).toEqual(true)
		expect(cache.has(3)).toEqual(true)
	})

	test('can delete item', () => {
		let cache = new LRU<string, number>({ size: 2 })
		cache.set(1, 'bar')
		cache.set(2, 'baz')

		expect(cache.has(1)).toEqual(true)
		cache.delete(1)
		expect(cache.has(1)).toEqual(false)
	})

	test('can clear items', () => {
		let cache = new LRU<string, number>({ size: 2 })
		cache.set(1, 'bar')
		cache.set(2, 'baz')

		expect(cache.has(1)).toEqual(true)
		expect(cache.has(2)).toEqual(true)
		cache.clear()

		expect(cache.size).toEqual(0)
		expect(cache.has(1)).toEqual(false)
		expect(cache.has(2)).toEqual(false)
	})
})