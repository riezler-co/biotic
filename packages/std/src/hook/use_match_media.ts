import { useEffect, useState, useMemo } from 'react'

export function useMatchMedia(mediaQuery: string) {

	let initalMatch = useMemo(() => {
		let mql = window.matchMedia(mediaQuery)
		return mql.matches
	}, [mediaQuery])

	let [matches, setMatch] = useState(initalMatch)

	useEffect(() => {
		let mql = window.matchMedia(mediaQuery)
		setMatch(mql.matches)
		let handleChange = (e: MediaQueryListEvent) => setMatch(e.matches)
		mql.addListener(handleChange)
		return () => {
			mql.removeListener(handleChange)
		}
	}, [setMatch, mediaQuery])

	return matches
}