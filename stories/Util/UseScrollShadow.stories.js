import React, { useRef } from 'react'
import styled from 'styled-components'
import { useScrollShadow } from '@package/react-utils/src/main'


let Wrapper = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;
`

let ScrollArea = styled.div`
	overflow: auto;
	width: 500px;
	height: 500px;
	-ms-overflow-style: none;  /* IE and Edge */
	scrollbar-width: none;  /* Firefox */
	&::-webkit-scrollbar {
	  display: none;
	}
`

let ScrollAreaScrollBar = styled.div`
	overflow: auto;
	width: 500px;
	height: 500px;
`

let Content = styled.div`
	width: 800px;
	height: 800px;
`

export default {
	title: 'Util/useScrollShadow',
}


export let ScrollShadow = () => {
	let ref = useRef(null)
	let [onScroll, style] = useScrollShadow(ref)

	return (
		<Wrapper>
			<ScrollArea ref={ref} onScroll={onScroll} style={style}>
				<Content>useScrollShadow</Content>
			</ScrollArea>
		</Wrapper>
	)
}

ScrollShadow.storyName = 'All sides'

export let ScrollShadowWithScrollBar = () => {
	let ref = useRef(null)
	let [onScroll, style] = useScrollShadow(ref)

	return (
		<Wrapper>
			<ScrollAreaScrollBar ref={ref} onScroll={onScroll} style={style}>
				<Content>useScrollShadow</Content>
			</ScrollAreaScrollBar>
		</Wrapper>
	)
}

ScrollShadowWithScrollBar.storyName = 'With Scrollbar'

export let TopBottom = () => {
	let ref = useRef(null)
	let [onScroll, style] = useScrollShadow(ref, { left: false, right: false })

	return (
		<Wrapper>
			<ScrollArea ref={ref} onScroll={onScroll} style={style}>
				<Content>useScrollShadow</Content>
			</ScrollArea>
		</Wrapper>
	)
}

TopBottom.storyName = 'Top and Bottom'

export let LeftRight = () => {
	let ref = useRef(null)
	let [onScroll, style] = useScrollShadow(ref, { top: false, bottom: false })

	return (
		<Wrapper>
			<ScrollArea ref={ref} onScroll={onScroll} style={style}>
				<Content>useScrollShadow</Content>
			</ScrollArea>
		</Wrapper>
	)
}

LeftRight.storyName = 'Left and Right'