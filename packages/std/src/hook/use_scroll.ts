import React, { RefObject } from 'react'
import _ from 'lodash'

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

export function useScroll(fn: (s: ScrollState) => void, container: RefObject<HTMLElement> = { current: null }) {
  let elm = container.current

  let [scroll, setScroll] = React.useState<ScrollState>({
		y: scrollTop(elm),
		x: scrollLeft(elm),
		delta: {
			y: scrollTop(elm),
			x: scrollLeft(elm),
		}
	})

  let cb = React.useRef((state: ScrollState) => {})
  React.useEffect(() => {
    cb.current = fn
  })

  let handleScroll = React.useCallback(
    _.throttle(function onScroll() {
      let newState = {
        y: scrollTop(elm),
        x: scrollLeft(elm),
        delta: {
          y: scrollTop(elm) - scroll.y,
          x: scrollLeft(elm) - scroll.x
        }
      }

      setScroll(newState)
      cb.current && cb.current(newState)
    }, 500, { leading: false, trailing: true }),
    [elm]
  )

  React.useEffect(() => {
    let scrollContainer = container.current ? container.current : window
    scrollContainer.addEventListener('scroll', handleScroll)
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll)
      handleScroll.cancel()
    }
  // eslint-disable-next-line
  }, [container.current])

  return scroll
}