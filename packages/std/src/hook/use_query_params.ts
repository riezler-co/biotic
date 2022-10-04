import { useMemo } from 'react'

/**
 * Returns a URLSearchParams object.
 */
export function useQueryParams(queryString: string = window.location.search) {
	return useMemo(() => {
		let searchParams = new URLSearchParams(queryString)
		return searchParams
	}, [queryString])
}