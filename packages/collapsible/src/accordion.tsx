import {
	useState,
	createContext,
	useContext,
	Children,
	cloneElement,
	ReactElement,
    ReactNode
} from 'react'
import { Collapsible } from './collapsible'
import { AnimateSharedLayout, motion } from 'framer-motion'
import styles from './style.module.css'

type UseAccordion = {
	open: Array<number>;
	multi: boolean;
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


type AccordionProps = {
	open: Array<number>;
	onClose: (i: number) => void;
	onOpen: (i: number) => void;
	children?: ReactNode;
}

let AccordionCtx = createContext<AccordionProps>({
	open: [],
	onOpen: (_: number) => {},
	onClose: (_: number) => {},
})

export let Accordion: React.FC<AccordionProps> = ({ open, onClose, onOpen, children }) => {
	
	let _children = Children.map(children, (node, index) => {
		return cloneElement((node as ReactElement), { index })
	})

	return (
		<AccordionCtx.Provider value={{ open, onClose, onOpen }}>
			<AnimateSharedLayout>
				<motion.ul layout className={styles['accordion-list']}>
					{ _children }
				</motion.ul>
			</AnimateSharedLayout>
		</AccordionCtx.Provider>
	)	
}


type AccordionItemProps = {
	index: number;
	children?: ReactNode
}

export let AccordionItem = ({ children, index }: AccordionItemProps) => {

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
	index: number,
	className?: string,
	children?: ReactNode,
}

export let AccordionTitle = ({ children, index, className, ...props }: AccordionTitleProps) => {
	let { open, onOpen, onClose } = useContext(AccordionCtx)
	let isOpen = open.includes(index)

	function handleClick() {	
		let fn = isOpen ? onClose : onOpen
		fn(index)
	}

	let classes = [
		styles['accordion-title'],
		className,
		isOpen ? 'is-open' : '',
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
	index: number;
	children: ReactNode;
	className?: string;
}

export let AccordionConent = ({ children, index, className, ...props }: AccordionConentProps) => {
	let { open } = useContext(AccordionCtx)

	let classes = [
		styles['accordion-content'],
		open ? styles['accordion-content--open'] : '',
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
