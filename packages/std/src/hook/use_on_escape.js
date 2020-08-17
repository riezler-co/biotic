import { useEffect, useRef } from 'react'

let NoOp = () => {}
export function useOnEscape(fn = NoOp) {
	let callback = useRef(fn)

	useEffect(() => {
		callback.current = fn
	})

	useEffect(() => {

		function onEsc (e) {
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
