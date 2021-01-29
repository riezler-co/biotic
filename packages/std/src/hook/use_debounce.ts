import { useCallback, useRef, useEffect } from 'react'
import type { DebouncedFunc, DebounceSettings } from 'lodash'
import _ from 'lodash'

type Dep = Array<any>
type Callback<A extends any[], T> = (...args: A) => T

export function useDebounce<A extends any[], T>(
	cb: Callback<A, T>,
	timeout: number = 0,
	dep: Dep = [],
	options?: DebounceSettings
): DebouncedFunc<Callback<A, T>> {
	let fn = useRef<Callback<A, T>>(cb)

	useEffect(() => {
		fn.current = cb
	})

	return useCallback(
		_.debounce((...args) => fn.current(...args), timeout, options),
		dep
	)
}

