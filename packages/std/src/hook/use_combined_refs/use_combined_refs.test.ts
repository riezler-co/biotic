import { renderHook } from '@testing-library/react'
import { useCombinedRefs } from './index'

describe('useCombinedRefs', () => {
	test('can combine refs', () => {
		let value = 'value'

		let fnRef = jest.fn()
		let mutableRef = { current: '' }
		let { result } = renderHook(() => useCombinedRefs(fnRef, mutableRef))

		result.current(value)

		expect(fnRef).toBeCalledWith(value)
		expect(mutableRef.current).toEqual(value)
	})
})