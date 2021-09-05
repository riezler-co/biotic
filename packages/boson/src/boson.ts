import {
	BehaviorSubject,
	ReplaySubject,
	isObservable,
} from 'rxjs'

import {
	ChangeCallback,
	ChangeObservable,
	isChangeCallback,
	isChangeObservable,
} from './utils'

export type OnChange<S> =
	| ChangeCallback<S>
	| ChangeObservable<S>

export type BosonConfig<S> = {
	key: string;
	persitent?: boolean;
	onChange?: Array<OnChange<S>>;
	defaultValue: S;
	bufferSize?: number;
}

export type Boson<T> = BosonConfig<T> & {
	state: BehaviorSubject<T>,
	history: ReplaySubject<T>,
	unsubscribe: () => void,
}

export function boson<S>(config: BosonConfig<S>, value?: S): Boson<S> {
	let prevState = value ?? config.defaultValue
	let history = new ReplaySubject<S>(config.bufferSize)

	history.next(prevState)

	let { onChange = [] } = config

	let cbs = onChange.filter(fn => {
		return isChangeCallback(fn)
	}) as Array<ChangeCallback<S>>

	let state = new BehaviorSubject(value ?? config.defaultValue)
	let subscription = state.subscribe(state => {
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
		subscription.unsubscribe()
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

