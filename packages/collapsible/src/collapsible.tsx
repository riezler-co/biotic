import { ReactNode } from 'react'
import { motion, AnimatePresence, Transition } from 'framer-motion'

let DefaultTransition = {
	type: "tween",
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
		visible: {
			opacity: 1,
			height: "auto",
			transform: "translateY(0px)",
		},
		hidden: {
			opacity: 0,
			height: 0,
			transform: "translateY(-50px)"
		},
	}

	return (
		<AnimatePresence initial={!open}>
			{ open && (
				<div style={{ overflow: "hidden" }}>
					<motion.div
						key='content'
						layout
						variants={variants}
			    		initial="hidden"
				        animate="visible"
				        exit="hidden"
				        transition={transition}
			    	>
						{ children }	
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	)
}
