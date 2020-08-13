import React from 'react';
import styled from 'styled-components'
import { Drawer } from '../packages/drawer/src/main'

export default {
	title: 'Drawer',
	component: Drawer
}

export let Sheet = () => {
	let [open, setOpen] = React.useState(false)

	return (
		<React.Fragment>
			<button onClick={() => setOpen(true)}>Open Drawer</button>
			<Drawer open={open} maxWidth={400} onClose={() => setOpen(false)} left>
				<div>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum dolores, sit odio nesciunt enim earum quod iusto molestias, quos excepturi.
				</div>
			</Drawer>
		</React.Fragment>
	)
}

Sheet.story = {
	name: 'Simple Drawer'
}