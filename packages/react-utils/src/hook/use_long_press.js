import { useCallback, useRef, useState } from "react"

let DefaultConfig = {
  shouldPreventDefault: true,
  delay: 300
}

export function useLongPress(onLongPress, config = {}) {
  let { shouldPreventDefault, delay } = { ...DefaultConfig, ...config }
  let [longPressTriggered, setLongPressTriggered] = useState(false)
  let timeout = useRef()
  let target = useRef()

  let start = useCallback(
    event => {
      if (shouldPreventDefault && event.target) {
        event.target.addEventListener("touchend", preventDefault, {
          passive: false
        })
        target.current = event.target
      }
      timeout.current = setTimeout(() => {
        onLongPress(event)
        setLongPressTriggered(true)
      }, delay)
    },
    [onLongPress, delay, shouldPreventDefault]
  )

  let clear = useCallback(
    (event, shouldTriggerClick = true) => {
      timeout.current && clearTimeout(timeout.current)
      setLongPressTriggered(false)
      if (shouldPreventDefault && target.current) {
        target.current.removeEventListener("touchend", preventDefault)
      }
    },
    [shouldPreventDefault, longPressTriggered]
  )

  return {
    onTouchStart: e => start(e),
    onTouchEnd: e => clear(e)
  }
}

let isTouchEvent = event => {
  return 'touches' in event
}

let preventDefault = event => {
  if (!isTouchEvent(event)) return

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault()
  }
}
