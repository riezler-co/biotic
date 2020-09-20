import { useCallback, useEffect, useRef } from 'react'
import _ from 'lodash'

export function useThrottle(cb, timeout = 0, dep = [], options = {}) {
	let fn = useRef(cb)

	useEffect(() => {
		fn.current = cb
	})

	return useCallback(_.throttle(() => fn.current(), timeout, options), dep)
}