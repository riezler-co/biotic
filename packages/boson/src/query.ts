import { useCallback, useRef, useEffect } from 'react'
import { Boson } from "./boson"
import { useBoson, UpdateFn } from './hooks'
import { bosonFamily } from './boson_family'

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
		key: `query-state:${key}`,
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

type CancelFn = (fn: () => any) => void

export function useQuery<Data, Error=any>(
	boson: Boson<Data>,
	fetcher: (cancel: CancelFn) => Promise<Data>,
	deps: Array<any> = [],
): UseQuery<Data, Error> {
	let [data, setData] = useBoson(boson)
	let [{ state, error, initialData, expireAt }, setState] = useBoson(queryStateFamily(boson.key))

	let fn = useRef(fetcher)
	useEffect(() => {
		fn.current = fetcher
	})

	let run = useCallback(() => {
		let onCancel = () => {}
		let cancel = (fn: () => any) => {
			onCancel = fn
		}

		fn.current(cancel)
			.then(data => {
				console.log({ data })
				setState(currentState => ({
					state: QueryState.Success,
					error: null,
					initialData: currentState.initialData ?? data,
					expireAt: Date.now() + 5 * 60 * 1000,
				}))

				setData(data)
			})
			.catch(error => {
				setState({
					state: QueryState.Error,
					error,
					expireAt: Date.now(),
				})
			})

		return () => {
			onCancel()
		}
	}, [boson, setData, setState]) 


	useEffect(() => {
		let isExpired = Date.now() > expireAt
		if (isExpired && state !== QueryState.Loading) {
			run()
			return
		}
	}, [run, state, expireAt, deps.join(':')])


	useEffect(() => {
		function handleFocus() {
			if (state !== QueryState.Loading) {
				run()
			}
		}

		document.addEventListener('focus', handleFocus)
		return () => {
			document.removeEventListener('focus', handleFocus)
		}
	}, [state])

	let reload = useCallback((force = false) => {
		if (state === QueryState.Loading && force === false) {
			return
		}

		run()
	}, [run])

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
