import { useCallback, useRef, useEffect } from 'react'
import { Boson } from './boson'
import { useBoson, UpdateFn } from './hooks'
import { bosonFamily } from './boson_family'
import { ObservableInput, from } from 'rxjs'

export enum QueryState {
	Init = 'init',
	Loading = 'loading',
	Success = 'loaded',
	Error = 'error',
}

export type State = {
	state: QueryState;
	error: unknown | null;
	initialData?: unknown;
	expireAt: number;
	reload: boolean;
}

let defaultState = {
	state: QueryState.Init,
	error: null,
	expireAt: Date.now(),
	reload: false,
}

let queryStateFamily = bosonFamily<[string], State>(() => {
	return {
		defaultValue: { ...defaultState },
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
	let [queryState, setState] = useBoson(queryStateFamily(boson.key))

	let fn = useRef(fetcher)
	useEffect(() => {
		fn.current = fetcher
	})

	let unsubscribe = useRef(() => {})
	useEffect(() => () => {
		unsubscribe.current()
	}, [setState])

	let run = useCallback((withLoading: boolean = true) => {
		if (withLoading) {
			setState(currentState => ({
				...currentState,
				state: QueryState.Loading,
			}))
		}

		let subscription = from(fn.current()).subscribe({
			next: (data: Data) => {
				setData(data)
				setState(currentState => {
					return {
						reload: true,
						state: QueryState.Success,
						error: null,
						initialData: currentState.initialData ?? data,
						expireAt: Date.now() + expireIn,
					}
				})
			},

			error: (error: Error) => {
				setState({
					state: QueryState.Error,
					error,
					expireAt: Date.now() + expireIn,
					reload: true,
				})
			},
		})

		return () => {
			subscription.unsubscribe()
		}
	}, [setData, setState, expireIn]) 


	let { key } = boson
	let { state, expireAt } = queryState
	useEffect(() => {
		let isExpired = Date.now() > queryState.expireAt
		let isLoading = state === QueryState.Loading

		if (isLoading || state === QueryState.Error) {
			return
		}

		if ((isExpired && !isLoading) || (expireAt === 0 && !isLoading)) {
			return run()
		}
	}, [run, key, expireAt, deps.join(':')])

	useEffect(() => {
		if (!fetchOnFocus) {
			return
		}

		function handleFocus() {
			if (queryState.state !== QueryState.Loading) {
				unsubscribe.current = run(false)
			}
		}

		document.addEventListener('focus', handleFocus)
		return () => {
			document.removeEventListener('focus', handleFocus)
		}
	}, [fetchOnFocus])

	let reload = useCallback((force = false) => {
		if (queryState.state === QueryState.Loading && force !== true) {
			return
		}

		unsubscribe.current = run()
	}, [run, queryState.state])

	let reset = useCallback(() => {
		setData(queryState.initialData as Data)
	}, [queryState.initialData, setData])

	let query = {
		state: queryState.state,
		data,
		error: queryState.error as Error | null,
		initialData: queryState.initialData as Data | undefined,
	}

	return [query, { reload, reset, set: setData }]
}
