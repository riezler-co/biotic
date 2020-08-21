import { useCallback } from 'react'
import _ from 'lodash'

export function useThrottle(cb, timeout = 0, dep = [], options = {}) {
	return useCallback(_.throttle(cb, timeout, options), dep)
}