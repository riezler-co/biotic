import { useCallback, useEffect, useRef } from 'react'
import type { DebouncedFunc, ThrottleSettings } from 'lodash'
import _ from 'lodash'

type Dep = Array<any>
type Callback<A extends any[], T> = (...args: A) => T

export function useThrottle<A extends any[], T>(
	cb: Callback<A, T>,
	timeout: number = 0,
	dep: Dep = [],
	options?: ThrottleSettings
): DebouncedFunc<Callback<A, T>> {
	let fn = useRef<Callback<A, T>>(cb)

	useEffect(() => {
		fn.current = cb
	})

	return useCallback(
		_.throttle((...args) => fn.current(...args), timeout, options),
		dep
	)
}
