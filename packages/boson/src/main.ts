import { useState, useEffect } from 'react'
import { Observable, BehaviorSubject } from 'rxjs'

type Boson<S> = {
	key: string;
	persitent?: boolean;
	defaultValue: S;
}

export function boson<S>(config: Boson<S>): Observable<S> {
	let subject = new BehaviorSubject(config.defaultValue)

	return subject
}

type SetterOrUpdater<S>
	= S
	| ((state: S) => S) 

export function useBoson<S>(boson: BehaviorSubject<S>): [S, (nextState: SetterOrUpdater<S>) => void] {
	let [state, setState] = useState<S>(boson.value)

	useEffect(() => {

		let sub = boson.subscribe((state) => {
			setState(state)
		})

		return () => {
			sub.unsubscribe()
		}
	}, [])

	function handleState(s: SetterOrUpdater<S>) {
		if (s instanceof Function) {
			let nextState = s(state)
			boson.next(nextState)
		} else {
			boson.next(s)
		}
	}

	return [state, handleState]
}

type Selector<S, R=S> = (boson: Observable<S>) => Observable<R>

export function useSelector<S, R=S>(
	boson: Observable<S>,
	selector?: Selector<S, R>
) {
	let [state, setState] = useState<R | undefined>()

	useEffect(() => {
		let stream = selector
			? selector(boson)
			: boson

		let sub = stream.subscribe(state => {
			setState(state as R)
		})

		return () => {
			sub.unsubscribe()
		}
	}, [])

	return state
}