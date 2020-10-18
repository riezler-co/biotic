import { useEffect, useState } from 'react'

type Container = Element | null

export function useGetContainer(id: string): Container {

	let [container, setContainer] = useState<Container>(null)

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