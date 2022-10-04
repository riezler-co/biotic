import { useEffect, useState } from 'react'

/* Returns a boolen whether a given media query matches or not.
 * The value gets update when the value of the match changes.
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia} 
*/
export function useMatchMedia(mediaQuery: string): boolean {
	let [matches, setMatch] = useState(() => {
		let mql = window.matchMedia(mediaQuery)
		return mql.matches
	})

	useEffect(() => {
		let mql = window.matchMedia(mediaQuery)
		setMatch(mql.matches)
		let handleChange = (e: MediaQueryListEvent) => setMatch(e.matches)
		mql.addEventListener('change', handleChange)
		return () => {
			mql.removeEventListener('change', handleChange)
		}
	}, [setMatch, mediaQuery])

	return matches
}