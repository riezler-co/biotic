import { useEffect, useRef } from 'react'

export function useResize(fn) {
	let cb = useRef()
	
	useEffect(() => {
		cb.current = fn
	})

	useEffect(() => {
		function handleResize(event) {
			cb.current && cb.current(event)
		}

		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])
}