import React from 'react'
import Dialog from '@package/dialog/main'

export default {
	title: 'Component/Dialog',
	component: Dialog
}

export let Default = () => {
	let [open, setOpen] = React.useState(false)

	return (
		<React.Fragment>
			<button onClick={() => setOpen(true)}>Open Dialog</button>

			<div style={{ height: '110vh', background: 'grey' }}></div>

			<button onClick={() => setOpen(true)}>Open Dialog</button>
			<Dialog open={open} onClose={() => setOpen(false)} width={400}>
				<h1>Biotic Dialog</h1>
				<button onClick={() => setOpen(false)}>Close</button>
			</Dialog>
		</React.Fragment>
	)
}

Default.storyName = 'Default'