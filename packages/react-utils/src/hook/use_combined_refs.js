import { useCallback } from 'react'

/**
 * Combines many refs into one. Useful for combining many ref hooks
 */
export function useCombinedRefs(...refs) {

  let refCallBack = (node) => {
    refs.forEach(ref => {
      if (!ref) {
          return
      }

      if (typeof ref === 'function') {
          return ref(node)
      }

      ref.current = node
    })
  }

  // eslint-disable-next-line
  return useCallback(refCallBack, refs)
}
