import React from 'react'
import { Textarea } from '@package/input/main'

export default {
	title: 'Form/Textarea',
	component: Textarea
}

export let Autogrow = () => {
	let [text, setText] = React.useState()

	return (
		<Textarea
			value={text}
			onChange={e => setText(e.target.value)}
		/>
	)
}

Autogrow.storyName = 'Autogrow'

export let MaxHeight = () => {
	let [text, setText] = React.useState()

	return (
		<Textarea
			maxHeight={100}
			value={text}
			onChange={e => setText(e.target.value)}
		/>
	)
}

MaxHeight.storyName = 'Max Height'

export let MinRows = () => {
	let [text, setText] = React.useState()

	return (
		<Textarea
			minRows={5}
			value={text}
			onChange={e => setText(e.target.value)}
		/>
	)
}

MinRows.storyName = 'Min Rows'

export let MinMax = () => {
	let [text, setText] = React.useState()

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