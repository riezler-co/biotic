import { RefObject, useEffect, useRef, useState } from 'react'
import { useThrottle } from './use_throttle'

function scrollTop(elm: HTMLElement | null) {
  if (!elm) {
    return window.pageYOffset
  }

  return elm.scrollTop
}

function scrollLeft(elm: HTMLElement | null) {
  if (!elm) {
    return window.pageXOffset
  }

  return elm.scrollLeft
}

type ScrollState = {
  y: number;
  x: number;
  delta: {
    y: number;
    x: number
  }
}

type Options = {
  container?: RefObject<HTMLElement>,
  timeout?: number,
}

/**
 * Returns the current scroll psotion for a given element.
 * By default, the callback is beeing throttled by 500ms.
*/
export function useScroll(fn: (s: ScrollState) => void, options?: Options) {
  let elm = options?.container?.current ?? null
  let timeout = options?.timeout ?? 500

  let [scroll, setScroll] = useState<ScrollState>({
		y: scrollTop(elm),
		x: scrollLeft(elm),
		delta: {
			y: scrollTop(elm),
			x: scrollLeft(elm),
		}
	})

  let cb = useRef(fn)
  useEffect(() => {
    cb.current = fn
  })

  let handleScroll = useThrottle(
    function onScroll() {
      let newState = {
        y: scrollTop(elm),
        x: scrollLeft(elm),
        delta: {
          y: scrollTop(elm) - scroll.y,
          x: scrollLeft(elm) - scroll.x
        }
      }

      setScroll(newState)
      cb.current(newState)
    }, timeout, [setScroll], { leading: false, trailing: true }
  )

  useEffect(() => {
    let scrollContainer = elm ?? window
    scrollContainer.addEventListener('scroll', handleScroll)
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll)
      handleScroll.cancel()
    }
  }, [elm])

  return scroll
}