import { useRef, useEffect } from 'react'

export function useIdleCallback(cb) {

	let savedCallback = useRef()

  let requestIdleCallback = useRef(() => {})
  let cancelIdleCallback = useRef(() => {})

  useEffect(() => {
    requestIdleCallback.current = window.requestIdleCallback ||
      function (cb) {
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
      function (id) {
        clearTimeout(id)
      }
  })

	useEffect(() => {
		savedCallback.current = cb
	})

	useEffect(() => {
		let cancelToken = requestIdleCallback.current(savedCallback.current)
		return () => {
			cancelIdleCallback.current(cancelToken)
		}
	}, [])
}