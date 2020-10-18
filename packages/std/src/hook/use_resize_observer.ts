import { useEffect, useRef, useState } from 'react'

type DOMRect =
	{ x: number
	; y: number
	; width: number
	; height: number;
	}

type ResizeObserverSize =
	{ inlineSize: number
	; blockSize: number
	}

export type ResizeObserverEntry =
	{ target: HTMLElement
	; contentRect: DOMRect
	; borderBoxSize: ResizeObserverSize
	; contentBoxSize: ResizeObserverSize
	; devicePixelContentBoxSize: ResizeObserverSize
	}

export type Entries = Array<ResizeObserverEntry>

export function useResizeObserver(cb: (e: Entries) => any) {
	let fn = useRef(cb)
	let cleanUp = useRef(() => {})
	let [ref, setRef] = useState<HTMLElement | null>(null)

	useEffect(() => {
		fn.current = cb
	})

	useEffect(() => {
		if (!ref) return

		let resizeObserver = new window.ResizeObserver((entries: Entries) => {
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