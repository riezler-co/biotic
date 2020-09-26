import React from 'react'
import { Select, Option } from '@package/select/main'

export default {
	title: 'Form/Select',
	component: Select
}

export let Default = () => {

	return (
		<Select>
			<Option>Hillary Hahn</Option>
			<Option>Ray Chen</Option>
			<Option>James Ehnes</Option>
		</Select>
	)
}

Default.storyName = 'Default'