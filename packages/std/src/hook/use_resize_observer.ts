import { MutableRefObject, useEffect, useRef } from 'react'

export type Entries = Array<ResizeObserverEntry>

/**
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver}
*/
export function useResizeObserver<T extends Element>(cb: (e: Entries) => any): MutableRefObject<T | null> {
	let cleanUp = useRef(() => {})
	let container = useRef<T | null>(null)

	let fn = useRef(cb)
	useEffect(() => {
		fn.current = cb
	})

	let { current } = container
	useEffect(() => {
		if (!current) return

		let resizeObserver = new ResizeObserver((entries: Entries) => {
			cleanUp.current = fn.current(entries)
		})

		resizeObserver.observe(current)

		return () => {
			resizeObserver.disconnect()
			cleanUp.current && cleanUp.current()
		}
	}, [current])

	return container
}