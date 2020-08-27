import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'
import { useResizeObserver } from '@biotic-ui/std'

let StyledCollapsible = styled.div`
	overflow: hidden;
`

export function Collapsible({ children, open, className }) {

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
		<StyledCollapsible as={animated.div}
											 style={aimation}
											 className={className}>
			<animated.div style={content} ref={ref}>
				{ children }
			</animated.div>
		</StyledCollapsible>
	)
}