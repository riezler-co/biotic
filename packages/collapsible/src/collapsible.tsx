import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useResizeObserver } from '@biotic-ui/std'
import { motion, AnimatePresence, Transition } from 'framer-motion'

let Wrapper = styled(motion.div)`
	overflow: hidden;
`

let DefaultTransition = {
	type: "tween",
	ease: "linear",
	duration: 0.2
}

type CollapsibleProps = React.FC<{
	open: boolean,
	transition?: Transition
}>

export let Collapsible: CollapsibleProps = ({
	children,
	open,
	transition = DefaultTransition,
	...props
}) => {

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
				<Wrapper layout
					key="wrapper"
		            initial="collapsed"
		            animate="open"
		            exit="collapsed"
		            variants={wrapper}
		            transition={transition}
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
				</Wrapper>
			)}
		</AnimatePresence>
	)
}