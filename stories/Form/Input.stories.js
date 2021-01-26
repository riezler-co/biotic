import React from 'react'
import { Input, Password } from '@package/input/main'

export default {
	title: 'Form/Input',
	component: Input
}

export let Default = () => {
	let [text, setText] = React.useState('')

	return (
		<Input
			value={text}
			onChange={e => setText(e.target.value)}
		/>
	)
}

export let Disabled = () => {
	let [text, setText] = React.useState('Bla Bla Bla')

	return (
		<Input
			value={text}
			onChange={e => setText(e.target.value)}
			disabled
		/>
	)
}

Disabled.storyName = 'Disabled'

export let AsPassword = () => {
	let [text, setText] = React.useState('')

	return (
		<Password
			value={text}
			onChange={e => setText(e.target.value)}
		/>
	)
}

AsPassword.storyName = 'Password'