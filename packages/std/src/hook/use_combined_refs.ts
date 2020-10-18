import { useCallback, Ref } from 'react'

/**
 * Combines many refs into one. Useful for combining many ref hooks
 */
export function useCombinedRefs<T extends any>(...refs: Array<Ref<T>>): Ref<T> {

  let refCallBack = (node: T) => {
    refs.forEach(ref => {
      if (!ref) {
          return
      }

      if (typeof ref === 'function') {
          return ref(node)
      }

      (ref as any).current = node
    })
  }

  // eslint-disable-next-line
  return useCallback(refCallBack, refs)
}
