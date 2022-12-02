import { useEffect } from 'react'

/**
 * Applies oveflow:hidden to the document, preventing the
 * user from scrolling the page and additionally adds padding
 * to compensate for the scrollbar.
*/
export function usePreventScroll(prevent = true) {
  useEffect(() => {
  	if (!prevent) return

    let isLeft = document.dir === 'left'

    let padding = isLeft
      ? document.body.style.paddingRight
      : document.body.style.paddingLeft

    let { overflow } = document.body.style
  	let scrollbarWidth = window.innerWidth - document.body.offsetWidth
    // TODO: figure out how the browser handles different text directions
    if (isLeft) {
      document.body.style.paddingRight = `calc(${scrollbarWidth}px + ${padding})`
    } else {
      document.body.style.paddingLeft = `calc(${scrollbarWidth}px + ${padding})`
    }

    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = overflow
      if (isLeft) {
        document.body.style.paddingRight = padding
      } else {
        document.body.style.paddingLeft = padding
      }
    }
  }, [prevent])
}