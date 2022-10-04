import { useEffect, useRef } from 'react'

/**
 * Calls the given function when a resize event occurs 
 */
export function useResize(fn: (e: Event) => void) {
	let cb = useRef(fn)
	useEffect(() => {
		cb.current = fn
	})

	useEffect(() => {
		function handleResize(event: Event) {
			cb.current && cb.current(event)
		}

		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])
}