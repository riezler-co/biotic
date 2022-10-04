import { isPromise } from './is_promise'
import { isBrowser } from './is_browser'

describe('isPromise', () => {
	test('returns true for promise', () => {
		let promise = new Promise(() => {})
		expect(isPromise(promise)).toEqual(true)
	})

	test('returns false when arg is not a promise', () => {
		let items = ['', 1, [], {}, new Map(), new Set()]

		items.map(item => {
			expect(isPromise(item)).toEqual(false)
		})
	})
})

describe('isBrowser', () => {
	test('returns true for window', () => {
		expect(isBrowser({ window: true, localStorage: true })).toEqual(true)
	})

	test('returns false when localStorage is undefined', () => {
		expect(isBrowser({ window: true })).toEqual(false)
	})

	test('returns false when window is undefined', () => {
		expect(isBrowser({ localStorage: true })).toEqual(false)
	})
})