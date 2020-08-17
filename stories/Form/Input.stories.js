import React from 'react'
import { Input } from '@package/input/main'

export default {
	title: 'Form/Input',
	component: Input
}

export let Default = () => {
	let [text, setText] = React.useState()

	return (
		<Input
			value={text}
			onChange={e => setText(e.target.value)}
		/>
	)
}

Default.storyName = 'Default'