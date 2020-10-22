import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import { useResizeObserver } from '@biotic-ui/std'

let StyledCollapsible = styled.div<{ open: boolean }>`
	overflow: ${p => p.open ? 'unset' : 'hidden'};
`

type CollapsibleProps = React.FC<
	{ open: boolean }
>

export let Collapsible: CollapsibleProps = ({ children, open, ...props }) => {

	let [height, setHeight] = React.useState(0)

	let ref = useResizeObserver(entries => {
		entries.forEach(entry => {
			if (entry.contentRect) {
				setHeight(entry.contentRect.height)
			}
		})
	})

	let aimation = useSpring({
		height: open ? height : 0,
		config: {
			duration: 130
		}
	})

	let content = useSpring({
		transform: open ? 'translateY(0px)' : `translateY(-${height / 4}px)`,
		config: {
			duration: 210
		}
	})

	return (
		<StyledCollapsible {...props}
											 as={animated.div}
											 style={aimation}
											 open={open}>
			<animated.div style={content} ref={ref}>
				{ children }
			</animated.div>
		</StyledCollapsible>
	)
}