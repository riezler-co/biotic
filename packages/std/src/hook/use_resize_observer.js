import { useEffect, useRef, useState } from 'react'

export function useResizeObserver(cb) {
	let fn = useRef(cb)
	let cleanUp = useRef()
	let [ref, setRef] = useState(null)

	useEffect(() => {
		fn.current = cb
	})

	useEffect(() => {
		if (!ref) return

		let resizeObserver = new ResizeObserver(entries => {
			cleanUp.current = fn.current(entries)
		})

		resizeObserver.observe(ref)

		return () => {
			resizeObserver.disconnect()
			cleanUp.current && cleanUp.current()
		}
	}, [ref])

	return setRef
}