import 'open-props/open-props.min.css'

import { useState } from 'react'
import { Drawer } from '../src/drawer'
import { createRoot } from 'react-dom/client'

let DrawerDemo = () => {
	let [open, setOpen] = useState(false)
	let [left, setLeft] = useState(true)

	return (
		<div>
			<button onClick={() => setOpen(true)}>
				Open { open.toString() }
			</button>

			<button onClick={() => setLeft(!left)}>
				Side: { left ? 'left' : 'right' }
			</button>

			<Drawer left={left} open={open} onClose={() => setOpen(false)}>
				AAAAAAAAAAAAAAAA
			</Drawer>
		</div>
	)
}

let root = createRoot(
  document.getElementById('demo')!
)

root.render(<DrawerDemo />)