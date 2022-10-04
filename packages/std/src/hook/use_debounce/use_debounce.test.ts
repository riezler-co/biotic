import { renderHook } from '@testing-library/react'
import { useDebounce } from './index'

describe('useDebounce', () => {
	test('can debounce function: leading', async () => {
		let timeout = 50
		let fn = jest.fn()
		let { result } = renderHook(() => useDebounce<[number]>(fn, timeout, [], {
			leading: true
		}))
		
		result.current(1)
		result.current(2)

		expect(fn).toBeCalledTimes(1)
		expect(fn).toBeCalledWith(1)
	})

	test('can debounce function: trailing', async () => {
		let timeout = 50
		let fn = jest.fn()
		let { result } = renderHook(() => useDebounce<[number]>(fn, timeout, [], {
			leading: false
		}))
		
		result.current(1)
		result.current(2)

		await sleep(timeout)
		expect(fn).toBeCalledTimes(1)
		expect(fn).toBeCalledWith(2)

		result.current(3)
		result.current(4)
		result.current(5)
		result.current(6)
		
		await sleep(timeout)
		expect(fn).toBeCalledTimes(2)
		expect(fn).toBeCalledWith(6)
	})
})


function sleep(timeout: number = 50) {
	return new Promise((resolve) => setTimeout(resolve, timeout))
}