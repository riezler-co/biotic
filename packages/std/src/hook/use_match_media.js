import { useEffect, useState, useMemo } from 'react'

export function useMatchMedia(mediaQuery) {

	let initalMatch = useMemo(() => {
		let mql = window.matchMedia(mediaQuery)
		return mql.matches
	}, [mediaQuery])

	let [matches, setMatch] = useState(initalMatch)

	useEffect(() => {
		let mql = window.matchMedia(mediaQuery)
		setMatch(mql.matches)
		let handleChange = e => setMatch(e.matches)
		mql.addListener(handleChange)
		return () => {
			mql.removeListener(handleChange)
		}
	}, [setMatch, mediaQuery])

	return matches
}