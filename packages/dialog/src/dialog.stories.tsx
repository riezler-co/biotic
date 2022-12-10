import React from 'react'
import { Dialog } from './main'
import { Button } from '@biotic-ui/button'
import { StoryFn, Meta } from '@storybook/react'
import '../style.css'

export default {
	title: 'Dialog',
	component: Dialog
} as Meta

export let Default: StoryFn = () => {
	let [open, setOpen] = React.useState(false)

	return (
		<React.Fragment>
			<Button onClick={() => setOpen(true)}>Open Dialog</Button>

			<div style={{ height: '110vh', background: 'grey' }}></div>

			<Button onClick={() => setOpen(true)}>Open Dialog</Button>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<h1>Biotic Dialog</h1>
				<Button onClick={() => setOpen(false)}>Close</Button>
			</Dialog>
		</React.Fragment>
	)
}

Default.storyName = 'Default'