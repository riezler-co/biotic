import { useRef, useEffect } from 'react'

let requestIdleCallback = window.requestIdleCallback ||
  function (cb) {
    return setTimeout(function () {
      var start = Date.now();
      cb({ 
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50 - (Date.now() - start));
        }
      });
    }, 1);
  }

let cancelIdleCallback = window.cancelIdleCallback ||
  function (id) {
    clearTimeout(id);
  } 

export function useIdleCallback(cb) {

	let savedCallback = useRef()

	useEffect(() => {
		savedCallback.current = cb
	})

	useEffect(() => {
		let cancelToken = requestIdleCallback(savedCallback.current)
		return () => {
			cancelIdleCallback(cancelToken)
		}
	}, [])
}