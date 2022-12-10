import { Meta, StoryFn } from '@storybook/react'
import { Input, Password } from '.'
import { useState } from 'react'
import '../../style.css'

export default {
	title: 'Form/Input',
	component: Input
} as Meta

export let Default: StoryFn = () => {
	let [text, setText] = useState('')

	return (
		<Input
			value={text}
			onChange={e => setText(e.target.value)}
		/>
	)
}

export let Disabled: StoryFn = () => {
	let [text, setText] = useState('Bla Bla Bla')

	return (
		<Input
			value={text}
			onChange={e => setText(e.target.value)}
			disabled
		/>
	)
}

Disabled.storyName = 'Disabled'

export let AsPassword: StoryFn = () => {
	let [text, setText] = useState('')

	return (
		<Password
			value={text}
			onChange={e => setText(e.target.value)}
		/>
	)
}

AsPassword.storyName = 'Password'