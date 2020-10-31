import React from 'react'
import Dialog from '@package/dialog/main'
import { Button } from '@package/button/main'

export default {
	title: 'Component/Dialog',
	component: Dialog
}

export let Default = () => {
	let [open, setOpen] = React.useState(false)

	return (
		<React.Fragment>
			<Button onClick={() => setOpen(true)}>Open Dialog</Button>

			<div style={{ height: '110vh', background: 'grey' }}></div>

			<Button onClick={() => setOpen(true)}>Open Dialog</Button>
			<Dialog open={open} onClose={() => setOpen(false)} width={400}>
				<h1>Biotic Dialog</h1>
				<Button onClick={() => setOpen(false)}>Close</Button>
			</Dialog>
		</React.Fragment>
	)
}

Default.storyName = 'Default'