import { useState, useEffect, useRef, useCallback } from 'react'
import {
	Observable,
	BehaviorSubject,
	Subject,
	isObservable,
	Subscription,
	ReplaySubject,
} from 'rxjs'

import { take } from 'rxjs/operators'

type ChangeCallback<S> = (newState: S, prevState: S) => void
type ChangeObservable<S> = (bs: BehaviorSubject<S>) => Observable<unknown>

function isChangeCallback<S>(
	fn: ChangeCallback<S> | ChangeObservable<S>
): fn is ChangeCallback<S> {
	return fn.length === 2
}

function isChangeObservable<S>(
	fn: ChangeCallback<S> | ChangeObservable<S>
): fn is ChangeObservable<S> {
	return fn.length === 1
}

type OnChange<S> =
	| ChangeCallback<S>
	| ChangeObservable<S>

type BosonConfig<S> = {
	key: string;
	persitent?: boolean;
	onChange?: Array<OnChange<S>>;
	defaultValue: S;
	bufferSize?: number;
}

type Boson<T> = BosonConfig<T> & {
	state: BehaviorSubject<T>,
	history: ReplaySubject<T>,
	unsubscribe: () => void,
}

export function boson<S>(config: BosonConfig<S>): Boson<S> {
	let prevState = config.defaultValue
	let history = new ReplaySubject<S>(config.bufferSize)

	history.next(prevState)

	let { onChange = [] } = config

	let cbs = onChange.filter(fn => {
		return isChangeCallback(fn)
	}) as Array<ChangeCallback<S>>

	let state = new BehaviorSubject(config.defaultValue)
	state.subscribe(state => {
		cbs.forEach(cb => {
			cb(state, prevState)
		})

		prevState = state
		history.next(state)
	})

	let subscriptions = onChange
		.filter(fn => isChangeObservable(fn))
		.map(fn => (fn as ChangeObservable<S>))
		.map(fn => fn(state))
		.filter(o => isObservable(o))
		.map(observable => observable.subscribe())

	let unsubscribe = () => {
		subscriptions.forEach(sub => sub.unsubscribe())
		cbs = []
	}

	return {
		...config,
		persitent: config.persitent ?? true,
		state,
		history,
		unsubscribe,
	}
}


interface CreateBoson<T, S> {
	(...args: Array<T>): Boson<S>;
	cache: Map<string, Boson<S>>
}

export function bosonFamily<T, S>(
	createBoson: (...args: Array<T>) => BosonConfig<S>,
	getKey: (...args: Array<T>) => string = (...args) => args.join(':'),
): CreateBoson<T, S> {

	let cache = new Map<string, Boson<S>>()

	let fn = (...args: Array<T>) => {
		let key = getKey(...args)

		if (cache.has(key)) {
			return cache.get(key)!
		}

		let config = createBoson(...args)
		let b = boson(config)

		cache.set(key, b)

		return b
	}

	return Object.assign(fn, { cache })
}

export type SetterOrUpdater<S>
	= S
	| ((state: S) => S | Observable<S> | Promise<S>) 

export function useBoson<S>(boson: Boson<S>): [S, (nextState: SetterOrUpdater<S>) => void] {
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

type Selector<S, R> = (boson: Observable<S>) => Observable<R>

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

function isPromise<T>(value: any): value is Promise<T> {
	return value && value.then && typeof value.then === 'function';
}