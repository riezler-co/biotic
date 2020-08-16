import { useEffect } from 'react'

export function usePreventScroll(prevent = true) {
  useEffect(() => {
  	if (!prevent) return

    let { overflow, paddingRight } = document.body.style
  	let { clientWidth } = document.documentElement
  	let scrollbarWidth = window.innerWidth - document.body.offsetWidth
    document.body.style.paddingRight = `calc(${scrollbarWidth}px + ${paddingRight})`
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [prevent])
}