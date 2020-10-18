import { useEffect, useRef } from 'react'

export function useResize(fn: (e: Event) => void) {
	let cb = useRef((e: Event) => {})
	
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