import { useEffect, useState } from 'react'

export type WindowSize = {
	innerHeight: number;
	innerWidth: number;
}

export function useWindowSize(): WindowSize {
	let [size, setSize] = useState<WindowSize>(getWindowSize)
	
	useEffect(() => {
		function handleResize() {
			setSize(getWindowSize())
		}

		window.addEventListener('resize', handleResize)
		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [setSize])

	return size
}

function getWindowSize(): WindowSize {
	return {
		innerHeight: globalThis?.innerHeight ?? 0,
		innerWidth: globalThis?.innerWidth ?? 0,
	}
}