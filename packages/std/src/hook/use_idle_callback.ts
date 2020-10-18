import { useRef, useEffect } from 'react'

type CB =
  { didTimeout: boolean
  ; timeRemaining: () => number
  }


type IdelFn = (e: CB) => void
type IdelCallback = (fn: IdelFn) => number
type CancelIdleCallback = (id: number) => void

function NoOp (fn: IdelFn) {
  return setTimeout(() => {}, 0)
}

export function useIdleCallback(cb: IdelFn) {

	let savedCallback = useRef<IdelFn>(cb)

  let requestIdleCallback = useRef<any>(NoOp)
  let cancelIdleCallback = useRef<any>((t: number) => {})

  useEffect(() => {
    requestIdleCallback.current = window.requestIdleCallback ||
      function (cb: IdelFn) {
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