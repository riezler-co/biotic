import { useEffect, useState } from 'react'

export function useWindowSize(fn) {
	let [size, setSize] = useState({ innerHeight: 0, innerWidth: 0 })
	

	useEffect(() => {
		function handleResize() {
			setSize({
				innerHeight: window.innerHeight,
				innerWidth: window.innerWidth
			})
		}

		handleResize()
		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [setSize])


	return size
}