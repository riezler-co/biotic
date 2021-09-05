import { useCallback, useState, useRef, useEffect } from "react"
import { ObservableInput, from, Subscription } from 'rxjs'
import { Boson } from './boson'
import { useBoson } from './hooks'

export interface UseMutation<T extends Array<any>, Error> {
	(...args: T): void;
	loading: boolean;
	error: Error | null
}

export function useMutation<Error=any, Args extends Array<any>=any, Data=unknown>(
	boson: Boson<Data>,
	fn: (data: Data, ...args: Args) => ObservableInput<null | undefined | Partial<Data>>,
): UseMutation<Args, Error> {
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

		unsubscribe.current = from(_fn.current(_data.current, ...args)).subscribe({
			next: (response) => {
				if (response === undefined || response ===  null) {
					return
				}

				setData(currentState => {
					return {
						...currentState,
						...response,
					}
				})
				setLoading(false)
			},

			error: (err) => {
				setError(err)
				setLoading(false)
			},
		})

	}, [setData, setLoading, setError])

	return Object.assign(run, { error, loading })
}