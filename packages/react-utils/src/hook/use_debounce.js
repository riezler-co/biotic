import { useCallback } from 'react'
import _ from 'lodash'

export function useDebounce(cb, timeout = 0, dep = [], options = {}) {
	return useCallback(_.debounce(cb, timeout), dep, options)
}