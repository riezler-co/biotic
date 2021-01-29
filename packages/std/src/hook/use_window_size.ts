import { useEffect, useState } from 'react'

export type WindowSize = {
	innerHeight: number;
	innerWidth: number;
} 

export function useWindowSize(): WindowSize {
	let [size, setSize] = useState<WindowSize>({
		innerHeight: 0,
		innerWidth: 0,
	})
	
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