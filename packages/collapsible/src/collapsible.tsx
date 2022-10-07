import { ReactNode } from 'react'
import { motion, AnimatePresence, Transition } from 'framer-motion'

let DefaultTransition = {
	type: "tween",
	ease: "linear",
	duration: 0.2
}

type CollapsibleProps = {
	open: boolean,
	transition?: Transition,
	children?: ReactNode,
	className?: string,
}

export let Collapsible = ({
	children,
	open,
	transition = DefaultTransition,
	...props
}: CollapsibleProps) => {

	let variants = {
		visible: { transform: 'translateY(0%)' },
		hidden: { transform: 'translateY(-62%)' },
	}

	let wrapper = {
		open: { opacity: 1, height: "auto" },
		collapsed: { opacity: 0, height: 0 }
	}

	return (
		<AnimatePresence initial={!open}>
			{ open && (
				<motion.div
					layout
					key="wrapper"
		            initial="collapsed"
		            animate="open"
		            exit="collapsed"
		            variants={wrapper}
		            transition={transition}
		            style={{ overflow: 'hidden' }}
		            {...props}
				>
					<motion.div
						key='content'
						variants={variants}
			    		initial="hidden"
				        animate="visible"
				        exit="hidden"
				        transition={transition}
			    	>
						{ children }	
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
