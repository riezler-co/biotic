import { useMemo } from 'react'

export function useQueryParams(queryString: string) {
	return useMemo(() => {
		let searchParams = new URLSearchParams(queryString)
		return searchParams
	}, [queryString])
}