import { useEffect, useRef, RefObject } from 'react'

type Callback = (e: MouseEvent) => void

export function useOutsideClick<T extends HTMLElement = HTMLElement>(cb: Callback): RefObject<T> {
	let container = useRef<T | null>(null)
	let callback = useRef(cb)

	useEffect(() => {
		callback.current = cb
	})

	useEffect(() => {

		if (!container.current) {
			return
		}

		let handle = (event: MouseEvent) => {

			if (container.current === null) {
				return
			}

			let inTarget = event
				.composedPath()
				.includes(container.current)

			if (!inTarget) {
				callback.current(event)
			}
		}

		window.addEventListener('mousedown', handle)

		return () => {
			window.removeEventListener('mousedown', handle)
		}
	}, [container])

	return container
}