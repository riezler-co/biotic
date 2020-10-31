import React
      ,{ useState
			 , createContext
			 , useContext
			 , Children
			 , cloneElement
			 , ReactElement
			 } from 'react'
import styled from 'styled-components'
import { Collapsible } from './collapsible'
import { AnimateSharedLayout, motion, AnimatePresence } from 'framer-motion'

type UseAccordion =
	{ open: Array<number>
	; multi: boolean
	}

let defaultOptions: UseAccordion = {
	open: [],
	multi: false
}

export function useAccordion(userOptions: UseAccordion = defaultOptions) {
	let options = { ...defaultOptions, ...userOptions }
	let [open, setOpen] = useState(options.open)

	let onOpen = (index: number) => {
		if (!options.multi) {
			return setOpen([index])
		}

		let hasIndex = open.includes(index)
		if (hasIndex) {
			return
		}

		setOpen([...open, index])
	}
	
	let onClose = (index: number) => {
		setOpen(open.filter(i => i !== index))
	}

	return { open, onOpen, onClose }
}


type AccordionProps =
	{ open: Array<number>
	; onClose: (i: number) => void
	; onOpen: (i: number) => void
	; 
	}

let AccordionCtx = createContext<AccordionProps>({
	open: [],
	onOpen: (n: number) => {},
	onClose: (n: number) => {},
})

let List = styled(motion.ul)`
	list-style-type: none;
	padding: 0;
	margin: 0;
`

export let Accordion: React.FC<AccordionProps> = ({ open, onClose, onOpen, children }) => {
	
	let _children = Children.map(children, (node, index) => {
		return cloneElement((node as ReactElement), { index })
	})

	return (
		<AccordionCtx.Provider value={{ open, onClose, onOpen }}>
			<AnimateSharedLayout>
				<List layout>
					{ _children }
				</List>
			</AnimateSharedLayout>
		</AccordionCtx.Provider>
	)	
}


type AccordionItemProps = React.FC<{ index: number }>

export let AccordionItem: AccordionItemProps = ({ children, index }) => {

	let _children = Children.map(children, (node) => {
		return cloneElement((node as ReactElement), { index })
	})

	return (
		<motion.li layout>
			{ _children }
		</motion.li>
	)
}


let StyledAccordionTitle = styled(motion.button)`
	background: none;
	border: none;
	flex-grow: 0;
	cursor: pointer;
	padding: calc(var(--baseline) / 2) var(--baseline);
`

type AccordionTitleProps = React.FC<{ index: number, className?: string }>

export let AccordionTitle: AccordionTitleProps = ({ children, index, className, ...props }) => {
	let { open, onOpen, onClose } = useContext(AccordionCtx)
	let isOpen = open.includes(index)

	function handleClick() {	
		let fn = isOpen ? onClose : onOpen
		fn(index)
	}

	let _className = `${className} ${isOpen && 'is-open'}`

	return (
		<StyledAccordionTitle layout {...props} onClick={handleClick} className={_className}>
			{ children }
		</StyledAccordionTitle>
	)
}


let StyledAccordionContent = styled(Collapsible)`
	padding: ${p => p.open ? 'calc(var(--baseline) / 2)' : '0'} var(--baseline);
`

type AccordionConentProps = React.FC<{ index: number }>

export let AccordionConent: AccordionConentProps = ({ children, index, ...props }) => {
	let { open } = useContext(AccordionCtx)

	return (
		<StyledAccordionContent open={open.includes(index)} {...props}>
			{ children }
		</StyledAccordionContent>
	)
}
