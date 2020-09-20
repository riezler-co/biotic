import { useCallback, useRef, useEffect } from 'react'
import _ from 'lodash'

export function useDebounce(cb, timeout = 0, dep = [], options = {}) {

	let fn = useRef(cb)

	useEffect(() => {
		fn.current = cb
	})

	return useCallback(_.debounce(() => fn.current(), timeout, options), dep)
}