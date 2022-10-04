import { useEffect, useRef, MutableRefObject } from 'react'


type Callback = (e: Event) => void

/**
 * Returns a {@link RefObject} that can be attached to an HTMLELement.
 * The provided callback will be called once the user clicks outside the element.
*/
export function useOutsideClick<T extends HTMLElement = HTMLElement>(cb: Callback): MutableRefObject<T | null> {
	let container = useRef<T | null>(null)
	
	let callback = useRef(cb)
	useEffect(() => {
		callback.current = cb
	})

	let { current } = container
	useEffect(() => {
		if (!current) {
			return
		}

		let handle = (event: Event) => {
			if (current === null) {
				return
			}

			let inTarget = event
				.composedPath()
				.includes(current)

			if (!inTarget) {
				callback.current(event)
			}
		}

		window.addEventListener('mousedown', handle)
		return () => {
			window.removeEventListener('mousedown', handle)
		}
	}, [current])

	return container
}