import { useState } from "react"
import { BottomSheet } from "./bottom_sheet"

import "../style.css"

export default {
	title: 'Bottom Sheet'
}

export let bottomSheet = () => {
	let [open, setOpen] = useState(false)
	return (
		<>
			<button onClick={() => setOpen(true)}>Open</button>
			<BottomSheet open={open} onClose={() => setOpen(false)}>
				<div style={{ height: 500, background: '#f0f' }}></div>
			</BottomSheet>
		</>
	)
}
