import { useState } from 'react'
import { Drawer } from './drawer'

export default {
	title: 'Drawer'
}

export let drawer = () => {
	let [open, setOpen] = useState(false)

	return (
		<div>
				
			<button onClick={() => setOpen(true)}>
				Open
			</button>

			<Drawer open={open} onClose={() => setOpen(false)}>
				
			</Drawer>
		</div>
	)
}