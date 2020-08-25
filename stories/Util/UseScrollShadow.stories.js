import React, { useRef } from 'react'
import styled from 'styled-components'
import { useScrollShadow } from '@package/std/main'


let Wrapper = styled.div`
	display: flex;
	width: 100%;
	min-height: 100%;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`

let ScrollArea = styled.div`
	overflow: auto;
	width: 500px;
	max-width: 90vw;
	height: 500px;
	max-height: 80vh;
	flex-shrink: 0;
	margin-bottom: 2rem;
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
	max-height: 80vh;
	max-width: 90vw;
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
	let [onScroll, style, ShadowBox] = useScrollShadow(ref, { debug: true })

	return (
		<Wrapper>
			<ScrollArea ref={ref} onScroll={onScroll}>
				<Content>useScrollShadow</Content>
				<ShadowBox style={style} />
			</ScrollArea>
		</Wrapper>
	)
}

ScrollShadow.storyName = 'All sides'

export let ScrollShadowWithScrollBar = () => {
	let ref = useRef(null)
	let [onScroll, style, ShadowBox] = useScrollShadow(ref)

	return (
		<Wrapper>
			<ScrollAreaScrollBar ref={ref} onScroll={onScroll}>
				<Content>useScrollShadow</Content>
				<ShadowBox style={style} />
			</ScrollAreaScrollBar>
		</Wrapper>
	)
}

ScrollShadowWithScrollBar.storyName = 'With Scrollbar'

export let TopBottom = () => {
	let ref = useRef(null)
	let [onScroll, style, ShadowBox] = useScrollShadow(ref, { left: false, right: false })

	return (
		<Wrapper>
			<ScrollArea ref={ref} onScroll={onScroll}>
				<Content>useScrollShadow</Content>
				<ShadowBox style={style} />
			</ScrollArea>
		</Wrapper>
	)
}

TopBottom.storyName = 'Top and Bottom'

export let LeftRight = () => {
	let ref = useRef(null)
	let [onScroll, style, ShadowBox] = useScrollShadow(ref, { top: false, bottom: false })

	return (
		<Wrapper>
			<ScrollArea ref={ref} onScroll={onScroll}>
				<Content>useScrollShadow</Content>
				<ShadowBox style={style} />
			</ScrollArea>
		</Wrapper>
	)
}

LeftRight.storyName = 'Left and Right'