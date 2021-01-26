import { useCallback, Ref } from 'react'


type RefCallback<T extends any> = (node: T | null) => void

/**
 * Combines many refs into one. Useful for combining many ref hooks
 */
export function useCombinedRefs<T extends any>(...refs: Array<Ref<T>>): RefCallback<T> {

  let refCallBack = (node: T | null) => {
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
