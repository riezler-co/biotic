import { useRef, useEffect, RefObject } from 'react'

export function useMounted(): RefObject<boolean> {
	let mounted = useRef(true)

	useEffect(() => {
		mounted.current = true
		return () => { mounted.current = false }
	},[])

	return mounted
}