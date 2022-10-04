import {
	FormEvent,
	useState,
	Dispatch,
	SetStateAction,
    useCallback,
} from 'react'

type FormHook<T> = [
	T,
	(e: FormEvent) => void,
	Dispatch<SetStateAction<T>>, 
]

/*
 * A simlple form hook, it returns the current form values, a
 * callback to update individual form values and a set form
 * function to set an entire form.
*/
export function useForm<T>(initalData: T): FormHook<T> {
	let [form, setForm] = useState<T>(initalData)
	
	let handleChange = useCallback((e: FormEvent) => {
		let { name, value } = (e.target as HTMLInputElement)

		if (!name) {
			return
		}

		setForm({
			...form,
			[name]: value
		})
	}, [setForm])

	return [form, handleChange, setForm]
}
