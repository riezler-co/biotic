import { useEffect, useRef, useState } from 'react'

export function useResizeObserver(cb) {
	let fn = useRef(cb)
	let [ref, setRef] = useState(null)

	useEffect(() => {
		fn.current = cb
	})

	useEffect(() => {
		if (!ref) return

		let resizeObserver = new ResizeObserver(entries => {
			fn.current(entries)
		})

		resizeObserver.observe(ref)

		return () => {
			resizeObserver.disconnect()
		}
	}, [ref])

	return setRef
}