import React from 'react'

export function useForm(initalData) {
	let [form, setForm] = React.useState(initalData)
	
	function handleChange(e) {
		let { name, value } = e.target
		setForm({
			...form,
			[name]: value
		})
	}

	return [form, handleChange, setForm]
}