import { useCallback, useEffect, useRef } from 'react'
import _ from 'lodash'

type Dep = Array<any>

export function useThrottle<T>(cb: (...args: any[]) => T, timeout: number = 0, dep: Dep = [], options = {}) {
	let fn = useRef(cb)

	useEffect(() => {
		fn.current = cb
	})

	return useCallback(
			_.throttle(
					(...args) => fn.current(...args)
				, timeout
				, options
			)
		, dep
	)
}