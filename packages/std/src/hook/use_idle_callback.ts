import { useRef, useEffect } from 'react'

type CancelIdleCallback = (id: number) => void

function NoOp (_fn: IdleRequestCallback) {
  return setTimeout(() => {}, 0)
}

export function useIdleCallback(cb: IdleRequestCallback, deps?: Array<unknown>) {
  let requestIdleCallback = useRef<any>(NoOp)
  let cancelIdleCallback = useRef<CancelIdleCallback>((_: number) => {})
  useEffect(() => {
    requestIdleCallback.current = window.requestIdleCallback ||
      function (cb: IdleRequestCallback) {
        return setTimeout(function () {
          var start = Date.now()
          cb({ 
            didTimeout: false,
            timeRemaining: function () {
              return Math.max(0, 50 - (Date.now() - start))
            }
          })
        }, 1)
      }

    cancelIdleCallback.current = window.cancelIdleCallback ||
      function (id: number) {
        clearTimeout(id)
      }
  }, [])

  let savedCallback = useRef<IdleRequestCallback>(cb)
  useEffect(() => {
    savedCallback.current = cb
  })

	useEffect(() => {
		let cancelToken = requestIdleCallback.current(savedCallback.current)
		return () => {
			cancelIdleCallback.current(cancelToken)
		}
	}, deps)
}