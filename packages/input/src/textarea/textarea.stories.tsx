import { Meta, StoryFn } from '@storybook/react'
import { useState } from 'react'
import { Textarea } from '.'

export default {
	title: 'Form/Textarea',
	component: Textarea
} as Meta

export let Autogrow: StoryFn = () => {
	let [text, setText] = useState('')

	return (
		<Textarea
			value={text}
			onChange={e => setText(e.target.value)}
		/>
	)
}

Autogrow.storyName = 'Autogrow'

export let MaxHeight: StoryFn = () => {
	let [text, setText] = useState('')

	return (
		<Textarea
			maxHeight={100}
			value={text}
			onChange={e => setText(e.target.value)}
		/>
	)
}

MaxHeight.storyName = 'Max Height'

export let MinRows: StoryFn = () => {
	let [text, setText] = useState('')

	return (
		<Textarea
			minRows={5}
			value={text}
			onChange={e => setText(e.target.value)}
		/>
	)
}

MinRows.storyName = 'Min Rows'

export let MinMax: StoryFn = () => {
	let [text, setText] = useState('')

	return (
		<Textarea
			minRows={5}
			maxHeight={150}
			value={text}
			onChange={e => setText(e.target.value)}
		/>
	)
}

MinMax.storyName = 'Min/Max'