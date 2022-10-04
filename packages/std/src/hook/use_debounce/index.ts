import { useCallback, useRef, useEffect } from 'react'
import type { DebouncedFunc, DebounceSettings } from 'lodash'
import { debounce } from 'lodash'

type Dep = Array<any>
type Callback<Args extends any[], Return> = (...args: Args) => Return

/*
 * Returns a function that gets debounced when called.
 * 
 * useDebounce is a wrapper around {@link https://lodash.com/docs/4.17.15#debounce}
 * 
*/
export function useDebounce<Args extends any[], Return = any>(
	cb: Callback<Args, Return>,
	timeout: number = 0,
	dep: Dep = [],
	options?: DebounceSettings
): DebouncedFunc<Callback<Args, Return>> {
	let fn = useRef<Callback<Args, Return>>(cb)

	useEffect(() => {
		fn.current = cb
	})

	return useCallback(
		debounce((...args) => fn.current(...args), timeout, options),
		dep
	)
}

