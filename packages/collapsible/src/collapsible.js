import React from 'react'
import styled from 'styled-components'
import { useSpring, animated } from 'react-spring'

let StyledCollapsible = styled.div`
	overflow: hidden;
`

export function Collapsible({ children, open, className }) {

	let ref = React.useRef()
	let [height, setHeight] = React.useState(0)

	React.useLayoutEffect(() => {
		if (ref.current) {
			ref.current.style.cssText = 'height:auto'
			setHeight(ref.current.scrollHeight)
			ref.current.style.cssText = ''
		}
	}, [ref, children])

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