import { useEffect } from 'react'

/**
 * Applies oveflow:hidden to the document, preventing the
 * user from scrolling the page and additionally adds padding
 * to compensate for the scrollbar.
*/
export function usePreventScroll(prevent = true) {
  useEffect(() => {
  	if (!prevent) return

    let { overflow, paddingRight } = document.body.style
  	let scrollbarWidth = window.innerWidth - document.body.offsetWidth
    // TODO: figure out how the browser handles different text directions
    document.body.style.paddingRight = `calc(${scrollbarWidth}px + ${paddingRight})`
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [prevent])
}