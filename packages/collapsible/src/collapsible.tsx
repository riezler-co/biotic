import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useResizeObserver } from '@biotic-ui/std'
import { motion, AnimatePresence } from 'framer-motion'

type CollapsibleProps = React.FC<
	{ open: boolean }
>

export let Collapsible: CollapsibleProps = ({ children, open, ...props }) => {
	return (
		<AnimatePresence>
			<motion.div 
				layout
	    	initial={{ opacity: 0, transform: 'translateY(38%)' }}
	    	animate={{ opacity: 1, transform: 'translateY(0)' }}
	    	exit={{ opacity: 0, transform: 'translateY(38%)' }}
	    	{...props}
	    >
					{ open && children }
			</motion.div>
		</AnimatePresence>
	)
}