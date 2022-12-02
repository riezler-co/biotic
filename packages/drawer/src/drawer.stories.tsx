import { useState } from 'react'
import { StoryFn, Meta } from '@storybook/react'

import { Drawer, Position } from './drawer'
import { Button } from '@biotic-ui/button'

export default {
	title: 'Drawer',
	argTypes: {
		position: {
			defaultValue: Position.Left,
		  	control: 'select',
			options: Object.values(Position),
		}
	}
} as Meta

export let drawer: StoryFn = (args) => {
	let [open, setOpen] = useState(false)

	return (
		<div>
				
			<Button onClick={() => setOpen(true)}>
				Open
			</Button>

			<Drawer {...args} open={open} onClose={() => setOpen(false)}>
				<div style={{ width: 300 }}></div>
			</Drawer>
		</div>
	)
}