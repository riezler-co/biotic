import { useRef, useEffect, RefObject } from 'react'

/**
 * Returns a {@link RefObject} that indicates whether a given
 * component is still mounted or not This is usefull when working
 * with async functions.
 * 
*/
export function useMounted(): RefObject<boolean> {
	let mounted = useRef(true)

	useEffect(() => {
		mounted.current = true
		return () => { mounted.current = false }
	},[])

	return mounted
}