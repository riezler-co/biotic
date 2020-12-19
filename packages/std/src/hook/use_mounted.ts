import { useRef, useEffect, Ref } from 'react'

export function useMounted(): Ref<boolean> {
	let mounted = useRef(true)

	useEffect(() => {
		mounted.current = true
		return () => { mounted.current = false }
	},[])

	return mounted
}