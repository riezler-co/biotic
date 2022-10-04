import { renderHook } from '@testing-library/react'
import { useClickHandler } from './index'

describe('useClickHandler', () => {
	test('can handle single click', () => {
		let onClick = jest.fn()
		let onDblClick = jest.fn()

		let { result } = renderHook(() => {
			return useClickHandler({ onClick, onDblClick })
		})

		result.current(new MouseEvent('') as any)

		setTimeout(() => {
			expect(onClick).toBeCalledTimes(1)
			expect(onDblClick).toBeCalledTimes(0)
		}, 250)
	})

	test('can handle double click', () => {
		let onClick = jest.fn()
		let onDblClick = jest.fn()

		let { result } = renderHook(() => {
			return useClickHandler({ onClick, onDblClick })
		})

		result.current(new MouseEvent('') as any)
		result.current(new MouseEvent('') as any)

		setTimeout(() => {
			expect(onClick).toBeCalledTimes(0)
			expect(onDblClick).toBeCalledTimes(1)
		}, 250)
	})
})
