import { BehaviorSubject, Observable } from 'rxjs'

export type ChangeCallback<S> = (newState: S, prevState: S) => void
export type ChangeObservable<S> = (bs: BehaviorSubject<S>) => Observable<unknown>

export function isChangeCallback<S>(
	fn: ChangeCallback<S> | ChangeObservable<S>
): fn is ChangeCallback<S> {
	return fn.length === 2
}

export function isChangeObservable<S>(
	fn: ChangeCallback<S> | ChangeObservable<S>
): fn is ChangeObservable<S> {
	return fn.length === 1
}

export function isPromise<T>(value: any): value is Promise<T> {
	return value && value.then && typeof value.then === 'function';
}
