import React from 'react'
import _ from 'lodash'

function scrollTop(elm) {
  if (!elm) {
    return window.pageYOffset
  }

  return elm.scrollTop
}

function scrollLeft(elm) {
  if (!elm) {
    return window.pageXOffset
  }

  return elm.scrollLeft
}

export function useScroll(fn, container = {}) {
  let elm = container.current

  let [scroll, setScroll] = React.useState({
		y: scrollTop(elm),
		x: scrollLeft(elm),
		delta: {
			y: scrollTop(elm),
			x: scrollLeft(elm),
		}
	})

  let cb = React.useRef()
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