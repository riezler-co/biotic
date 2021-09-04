import {
	useEffect,
	useRef,
	useCallback,
	useState,
} from 'react'

import {
	isObservable,
	Observable,
	Subscription,
} from 'rxjs'

import { take } from 'rxjs/operators'

import { Boson } from './boson'
import { isPromise } from './utils';


export type SetterOrUpdater<S>
	= S
	| ((state: S) => S | Observable<S> | Promise<S>)

export type UpdateFn<State> = (nextState: SetterOrUpdater<State>) => void

export type UseBoson<State> = [State, UpdateFn<State>]

export function useBoson<State>(boson: Boson<State>): UseBoson<State> {
	let state = useBosonValue(boson)
	let handleState = useSetBoson(boson)
	return [state, handleState]
}

export function useSetBoson<T>(boson: Boson<T>) {
	let sub = useRef<Subscription | null>()
	let mounted = useRef(true)

	useEffect(() => () => {
		sub.current?.unsubscribe()
		mounted.current === false
	}, [boson])

	return useCallback((s: SetterOrUpdater<T>) => {
		if (s instanceof Function) {
			let nextState = s(boson.state.value)
			if (isObservable(nextState)) {
				sub.current = nextState
					.pipe(take(1))
					.subscribe(state => boson.state.next(state))
			} else if(isPromise<T>(nextState)) {
				nextState.then(state => {
					if (mounted.current) {
						boson.state.next(state)
					}
				})
			} else {
				boson.state.next(nextState)
			}
		} else {
			boson.state.next(s)
		}
		
	}, [boson])

}

export function useBosonValue<T>(boson: Boson<T>) {
	let [state, setState] = useState<T>(boson.state.value)
	useBosonEffect(boson, setState)
	return state
}

export function useBosonEffect<T>(boson: Boson<T>, cb: (s: T) => void) {
	let fn = useRef(cb)

	useEffect(() => {
		fn.current = cb
	})

	useEffect(() => {
		let sub = boson.state.subscribe(state => fn.current(state))
		return () => sub.unsubscribe()
	}, [boson])
}

export type Selector<S, R> = (boson: Observable<S>) => Observable<R>

export function useSelector<S, R=S>(
	boson: Boson<S>,
	selector: Selector<S, R>,
	initialState?: R
) {
	let [state, setState] = useState(initialState)

	useEffect(() => {

		let stream = selector(boson.state)
		let sub = stream.subscribe(state => {
			setState(state)
		})

		return () => {
			sub.unsubscribe()
		}
	}, [])

	return state
}
