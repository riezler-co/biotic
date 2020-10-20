import { useCallback, useRef, useEffect } from 'react'
import _ from 'lodash'

type Dep = Array<any>

export function useDebounce<T>(cb: (...args: any[]) => T, timeout = 0, dep: Dep = [], options = {}) {

	let fn = useRef(cb)

	useEffect(() => {
		fn.current = cb
	})

	return useCallback(_.debounce(
					(...args) => fn.current(...args)
				, timeout
				, options
				)
		, dep
	)
}