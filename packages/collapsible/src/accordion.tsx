import {
	useState,
	createContext,
	useContext,
	Children,
	cloneElement,
	ReactElement,
    ReactNode,
} from 'react'
import { Collapsible } from './collapsible'
import { AnimateSharedLayout, motion } from 'framer-motion'

type UseAccordion = {
	open?: Array<number>;
	multi?: boolean;
}

let defaultOptions: UseAccordion = {
	open: [],
	multi: false
}

export function useAccordion(userOptions: UseAccordion = defaultOptions) {
	let options = { ...defaultOptions, ...userOptions }
	let [open, setOpen] = useState(options.open ?? [])

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


type AccordionProps = {
	open: Array<number>;
	onClose: (i: number) => void;
	onOpen: (i: number) => void;
	children?: ReactNode;
	className?: string;
}

let AccordionCtx = createContext<AccordionProps>({
	open: [],
	onOpen: (_: number) => {},
	onClose: (_: number) => {},
})

export let Accordion = ({
	className = '',
	open,
	onClose,
	onOpen,
	children,
}: AccordionProps) => {
	let _children = Children.map(children, (node, index) => {
		return (
			<IndexCtx.Provider value={index}>
				{ node }
			</IndexCtx.Provider>
		)
	})

	return (
		<AccordionCtx.Provider value={{ open, onClose, onOpen }}>
			<AnimateSharedLayout>
				<motion.ul layout className={['biotic-accordion-list', className].join(' ')}>
					{ _children }
				</motion.ul>
			</AnimateSharedLayout>
		</AccordionCtx.Provider>
	)	
}

let IndexCtx = createContext<number>(0)

type AccordionItemProps = {
	children?: ReactNode
}

export let AccordionItem = ({ children }: AccordionItemProps) => {
	let index = useContext(IndexCtx)

	let _children = Children.map(children, (node) => {
		return cloneElement((node as ReactElement), { index })
	})

	return (
		<motion.li layout>
			{ _children }
		</motion.li>
	)
}

type AccordionTitleProps = {
	className?: string,
	children?: ReactNode,
}

export let AccordionTitle = ({ children, className, ...props }: AccordionTitleProps) => {
	let index = useContext(IndexCtx)
	let { open, onOpen, onClose } = useContext(AccordionCtx)
	let isOpen = open.includes(index)

	function handleClick() {	
		let fn = isOpen ? onClose : onOpen
		fn(index)
	}

	let classes = [
		'biotic-accordion-title',
		className,
		isOpen ? 'biotic-accordion-title--open' : '',
	].join(' ')

	return (
		<motion.button
			layout
			{...props}
			onClick={handleClick}
			className={classes}
		>
			{ children }
		</motion.button>
	)
}

type AccordionConentProps = {
	children: ReactNode;
	className?: string;
}

export let AccordionConent = ({ children, className, ...props }: AccordionConentProps) => {
	let index = useContext(IndexCtx)
	let { open } = useContext(AccordionCtx)

	let classes = [
		'biotic-accordion-content',
		open ? 'biotic-accordion-content--open' : '',
		className ?? '',
	]

	return (
		<Collapsible
			{...props}
			open={open.includes(index)}
			className={classes.join(' ')}
		>
			{ children }
		</Collapsible>
	)
}
