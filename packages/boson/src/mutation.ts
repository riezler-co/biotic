import { useCallback, useState, useRef, useEffect } from "react"
import { ObservableInput, from, Subscription } from 'rxjs'
import { Boson } from './boson'
import { useBoson } from './hooks'

type Response<Data> = void | null | undefined | Data 

export interface UseMutation<T extends Array<any>, Data, Error> {
	(...args: T): Promise<Response<Data>>;
	loading: boolean;
	error: Error | null;
	reset: () => void;
}

export function useMutation<Data=unknown, Error=any, Args extends Array<any>=any>(
	boson: Boson<Data>,
	fn: (data: Data, ...args: Args) => ObservableInput<Response<Data>>,
): UseMutation<Args, Data, Error> {
	let [loading, setLoading] = useState<boolean>(false)
	let [error, setError] = useState<Error | null>(null)
	let [data, setData] = useBoson(boson)

	let _data = useRef(data)
	useEffect(() => {
		_data.current = data
	})

	let _fn = useRef(fn)
	useEffect(() => {
		_fn.current = fn
	})

	let unsubscribe = useRef<Subscription | null>(null)
	useEffect(() => () => {
		if (unsubscribe.current) {
			unsubscribe.current.unsubscribe()
		}
	}, [])

	let run = useCallback((...args: Args) => {
		setError(null)
		setLoading(true)
		return new Promise<Response<Data>>((resolve, reject) => {
			unsubscribe.current = from(_fn.current(_data.current, ...args)).subscribe({
				next: (response) => {
					if (response) {
						setData(response)
					}
					
					setLoading(false)
					resolve(response)
				},

				error: (err) => {
					setError(err)
					setLoading(false)
					reject(err)
				},
			})
		})

	}, [setData, setLoading, setError])

	let reset = () => {
		setError(null)
		setLoading(false)
	}

	return Object.assign(run, { error, loading, reset })
}


export interface UsePost<T extends Array<any>, Data, Error> {
	(...args: T): Promise<Response<Data>>;
	loading: boolean;
	error: Error | null;
	reset: () => void;
}

export function usePost<Data=unknown, Error=any, Args extends Array<any>=any>(
	fn: (...args: Args) => ObservableInput<Response<Data>>,
): UsePost<Args, Data, Error> {
	let [loading, setLoading] = useState<boolean>(false)
	let [error, setError] = useState<Error | null>(null)

	let _fn = useRef(fn)
	useEffect(() => {
		_fn.current = fn
	})

	let unsubscribe = useRef<Subscription | null>(null)
	useEffect(() => () => {
		if (unsubscribe.current) {
			unsubscribe.current.unsubscribe()
		}
	}, [])

	let run = useCallback((...args: Args) => {
		setError(null)
		setLoading(true)
		return new Promise<Response<Data>>((resolve, reject) => {
			unsubscribe.current = from(_fn.current(...args)).subscribe({
				next: (response) => {
					setLoading(false)
					resolve(response)
				},

				error: (err) => {
					setError(err)
					setLoading(false)
					reject(err)
				},
			})
		})

	}, [setLoading, setError])

	let reset = () => {
		setError(null)
		setLoading(false)
	}

	return Object.assign(run, { error, loading, reset })
}