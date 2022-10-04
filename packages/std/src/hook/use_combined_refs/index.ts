import { useCallback, Ref } from 'react'


type RefCallback<T extends any> = (node: T | null) => void

/**
 * Returns a function that can be passed around as ref
 * 
 * useCombinedRefs takes an array of {@link Ref} and turns them
 * into a single Ref. When the {@link RefCallback} is beeing
 * called, it assignes the given {@link Ref} to all the Refs
 * in the argument array
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
