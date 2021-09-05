import { useCallback, useRef, useEffect } from 'react'
import { Boson } from "./boson"
import { useBoson, UpdateFn } from './hooks'
import { bosonFamily } from './boson_family'
import { ObservableInput, from } from 'rxjs'

export enum QueryState {
	Init = 'inti',
	Loading = 'loading',
	Success = 'loaded',
	Error = 'error',
}

export type State = {
	state: QueryState;
	error: unknown | null;
	initialData?: unknown;
	expireAt: number;
}

let queryStateFamily = bosonFamily<[string], State>((key) => {
	return {
		defaultValue: {
			state: QueryState.Init,
			error: null,
			expireAt: Date.now(),
		},
	}
})

export type Query<Data, Error> ={
	state: QueryState;
	data?: Data;
	initialData?: Data;
	error: Error | null;
}

export type UseQuery<Data, Error> = [
	Query<Data, Error>,
	{
		reload: (force?: boolean) => void;
		reset: () => void;
		set: UpdateFn<Data>;
	}
]

export type Options = {
	deps?: Array<any>;
	fetchOnFocus?: boolean;
	expireIn?: number;
}

export function useQuery<Error=any, Data=any>(
	boson: Boson<Data>,
	fetcher: () => ObservableInput<Data>,
	options: Options = {},
): UseQuery<Data, Error> {

	let {
		deps = [],
		fetchOnFocus = false,
		expireIn = 5 * 60 * 1000,
	} = options

	let [data, setData] = useBoson(boson)
	let [{ state, error, initialData, expireAt }, setState] = useBoson(queryStateFamily(boson.key))

	let fn = useRef(fetcher)
	useEffect(() => {
		fn.current = fetcher
	})

	let unsubscribe = useRef(() => {})
	useEffect(() => () => {
		unsubscribe.current()
	}, [])

	let run = useCallback(() => {
		setState(currentState => ({
			...currentState,
			state: QueryState.Loading,
		}))

		let subscription = from(fn.current()).subscribe({
			next: (data) => {
				setState(currentState => {
					return {
						state: QueryState.Success,
						error: null,
						initialData: currentState.initialData ?? data,
						expireAt: Date.now() + expireIn,
					}
				})

				setData(data)
			},

			error: (error) => {
				setState({
					state: QueryState.Error,
					error,
					expireAt: Date.now(),
				})
			}
		})

		return () => {
			subscription.unsubscribe()
		}
	}, [setData, setState, expireIn]) 

	let { key } = boson
	useEffect(() => {
		let isExpired = Date.now() > expireAt
		if (isExpired && state !== QueryState.Loading) {
			return run()
		}
	}, [run, key, deps.join(':')])


	useEffect(() => {
		if (!fetchOnFocus) {
			return
		}

		function handleFocus() {
			if (state !== QueryState.Loading) {
				unsubscribe.current = run()
			}
		}

		document.addEventListener('focus', handleFocus)
		return () => {
			document.removeEventListener('focus', handleFocus)
		}
	}, [state, fetchOnFocus])

	let reload = useCallback((force = false) => {
		if (state === QueryState.Loading && force !== true) {
			return
		}

		unsubscribe.current = run()
	}, [run, state])

	let reset = useCallback(() => {
		setData(initialData as Data)
	}, [initialData, setData])

	let query = {
		state,
		data,
		error: error as Error | null,
	}

	return [query, { reload, reset, set: setData }]
}
