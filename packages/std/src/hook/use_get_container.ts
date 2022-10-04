import { useEffect, useState } from 'react'

type Container = Element | null

/*
 * Returns an HTMLElement that can be used in combination with createPortal.
 * 
 * If no container has been found, a new HTMLDivElement will be created and
 * added to the HTMLBodyElement.
 *
 * If a container has been created and the hook unmounts, the newly created
 * element will be removed.
*/
export function useGetContainer(id: string, cleanUp: boolean = true): Container {

	let [container, setContainer] = useState<Container>(() => {
		return document.querySelector(`#${id}`)
	})

	useEffect(() => {
		let currentContainer = document.querySelector(`#${id}`)
		if (currentContainer !== null) return

		let newContainer = document.createElement('div')
		newContainer.id = id
		document.body.appendChild(newContainer)
		setContainer(newContainer)

		return () => {
			if (cleanUp) {
				newContainer.remove()
			}
		}
	}, [id])

	return container
}