import { FormEvent
			 , useState
			 , Dispatch
			 , SetStateAction
			 } from 'react'

type FormHook<T> =
	[ T
	, (e: FormEvent) => void
	, Dispatch<SetStateAction<T>>
	]

export function useForm<T>(initalData: T): FormHook<T> {
	let [form, setForm] = useState<T>(initalData)
	
	function handleChange(e: FormEvent) {
		let { name, value } = (e.target as HTMLInputElement)
		setForm({
			...form,
			[name]: value
		})
	}

	return [form, handleChange, setForm]
}
