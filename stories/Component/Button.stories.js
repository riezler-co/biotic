import React from 'react'
import { Button } from '@package/button/main'

export default {
	title: 'Component/Button',
	component: Button
}

export let Default = () => {
	return (
		<React.Fragment>
			<Button>Default Button</Button>
		</React.Fragment>
	)
}

Default.storyName = 'Default'