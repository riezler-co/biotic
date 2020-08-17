import { useEffect, useState } from 'react'

export function useGetContainer(id) {

	let [container, setContainer] = useState(null)

	useEffect(() => {

		if (container !== null) return

		let currentContainer = document.querySelector(`#${id}`)

		if (currentContainer === null) {
			let newContainer = document.createElement('div')
			newContainer.id = id
			document.body.appendChild(newContainer)
			setContainer(newContainer)
		} else {
			setContainer(currentContainer)
		}

	}, [id])

	return container
}