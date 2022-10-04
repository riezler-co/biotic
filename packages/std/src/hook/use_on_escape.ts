import { useEffect, useRef } from 'react'

let NoOp = (e: KeyboardEvent) => {}

/**
 * Listens to the escape key and calles the function
 * when the user presses the escape key.
*/
export function useOnEscape(fn = NoOp) {
	let callback = useRef(fn)

	useEffect(() => {
		callback.current = fn
	})

	useEffect(() => {

		function onEsc (e: KeyboardEvent) {
			if(e.key=='Escape' && callback.current){
			  callback.current(e)
			}
		}

		window.addEventListener('keydown', onEsc)
		return () => {
			window.removeEventListener('keydown', onEsc)
		}
	}, [])
}
