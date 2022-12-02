import React from 'react';
import { StoryFn, Meta } from '@storybook/react'
import { FloatingTaskBar, Task, TaskLabel, Position } from './main'
import { Button } from '@biotic-ui/button'

import {
	Pencil,
	Trash,
} from 'phosphor-react'

export default {
	title: 'Floating Task Bar',
	argTypes: {
	  position: {
	  	defaultValue: Position.Bottom,
	  	control: 'select',
		options: Object.values(Position),
	  },
	  backdrop: {
	  	defaultValue: false,
	  	control: 'boolean',
	  }
	},
} as Meta

export let Default: StoryFn = (args) => {
	let [open, setOpen] = React.useState(false)

	return (
		<div>
			<Button onClick={() => setOpen(!open)}>Toggle</Button>
			<FloatingTaskBar position={args.position} backdrop={args.backdrop}  open={open} onClose={() => setOpen(false)}>
				<Task>
					<Pencil />
					<TaskLabel>Edit</TaskLabel>
				</Task>
				<Task>
					<Trash />
					<TaskLabel>Delete</TaskLabel>
				</Task>
				<Task>
					<Trash />
					<TaskLabel>Delete</TaskLabel>
				</Task>
			</FloatingTaskBar>
		</div>
	)
}
