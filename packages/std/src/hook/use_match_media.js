import { useEffect, useState } from 'react'

export function useMatchMedia(mediaQuery) {
	let [matches, setMatch] = useState(false)

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