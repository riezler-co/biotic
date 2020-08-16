import React
      ,{ useState
			 , createContext
			 , useContext
			 , Children
			 , cloneElement
			 } from 'react'
import { Collapsible } from './collapsible'

let defaultOptions = {
	open: [],
	multi: false
}

export function useAccordion(userOptions = {}) {
	let options = { ...defaultOptions, ...userOptions }
	let [open, setOpen] = useState(options.open)

	let onOpen = index => {
		if (!options.multi) {
			return setOpen([index])
		}

		let hasIndex = open.includes(index)
		if (hasIndex) {
			return
		}

		setOpen([...open, index])
	}
	
	let onClose = index => {
		setOpen(open.filter(i => i !== index))
	}

	return { open, onOpen, onClose }
}

let AccordionCtx = createContext({
	open: [],
	onOpen: () => {},
	onClose: () => {},
})

export function Accordion({ open, onClose, onOpen, children }) {
	
	let _children = Children.map(children, (node, index) => {
		return cloneElement(node, { index })
	})

	return (
		<AccordionCtx.Provider value={{ open, onClose, onOpen }}>
			{ _children }
		</AccordionCtx.Provider>
	)	
}

export function AccordionItem({ children, index }) {

	let _children = Children.map(children, (node) => {
		return cloneElement(node, { index })
	})

	return (
		<div>
			{ _children }
		</div>
	)
}

export function AccordionTitle({ children, index }) {
	let { open, onOpen, onClose } = useContext(AccordionCtx)
	let isOpen = open.includes(index)

	function handleClick() {	
		let fn = isOpen ? onClose : onOpen
		fn(index)
	}

	return (
		<button onClick={handleClick} open={isOpen}>
			{ children }
		</button>
	)
}

export function AccordionConent({ children, index }) {
	let { open } = useContext(AccordionCtx)

	return (
		<Collapsible open={open.includes(index)}>
			{ children }
		</Collapsible>
	)
}
