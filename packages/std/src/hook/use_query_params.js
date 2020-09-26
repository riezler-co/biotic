import { useMemo } from 'react'

export function useQueryParams(queryString) {
	return useMemo(() => {
		let searchParams = new URLSearchParams(queryString)
		return searchParams
	}, [queryString])
}