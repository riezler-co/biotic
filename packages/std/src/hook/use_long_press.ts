import { useCallback, useRef, useState } from "react"

let DefaultConfig = {
  shouldPreventDefault: true,
  delay: 300
}

type Config = {
  shouldPreventDefault?: boolean;
  delay?: number;
}

type OnLongPress = (e: Event) => void

export function useLongPress(onLongPress: OnLongPress, config: Config = {}) {
  let { shouldPreventDefault, delay } = { ...DefaultConfig, ...config }
  let [longPressTriggered, setLongPressTriggered] = useState(false)
  let timeout = useRef(0)
  let target = useRef<HTMLElement | null>(null)

  let start = useCallback(
    (event: TouchEvent) => {
      if (shouldPreventDefault && event.target) {
        event.target.addEventListener("touchend", preventDefault, {
          passive: false
        })
        target.current = event.target as HTMLElement
      }
      timeout.current = window.setTimeout(() => {
        onLongPress(event)
        setLongPressTriggered(true)
      }, delay)
    },
    [onLongPress, delay, shouldPreventDefault]
  )

  let clear = useCallback(
    () => {
      timeout.current && window.clearTimeout(timeout.current)
      setLongPressTriggered(false)

      if (shouldPreventDefault && target.current !== null) {
        target.current.removeEventListener("touchend", preventDefault)
      }
    },
    [shouldPreventDefault, longPressTriggered]
  )

  return {
    onTouchStart: (e: TouchEvent) => start(e),
    onTouchEnd: (_e: TouchEvent) => clear()
  }
}

let isTouchEvent = (event: Event): event is TouchEvent => {
  return 'touches' in event
}

let preventDefault = (event: Event) => {
  if (!isTouchEvent(event)) return

  if (event.touches.length < 2 && event.preventDefault) {
    event.preventDefault()
  }
}
