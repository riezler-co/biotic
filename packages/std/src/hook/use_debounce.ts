import { useCallback, useRef, useEffect } from 'react'
import _ from 'lodash'

type Dep = Array<any>

export function useDebounce<T>(cb: () => T, timeout = 0, dep: Dep = [], options = {}) {

	let fn = useRef(cb)

	useEffect(() => {
		fn.current = cb
	})

	return useCallback(_.debounce(() => fn.current(), timeout, options), dep)
}