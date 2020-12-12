import React, { useRef } from 'react'
import styled from 'styled-components'
import { Panel,StackedPanels } from '@package/panel/main'

export default {
	title: 'Util/Background',
	argTypes: {},
}

let Wrapper = styled.div`
	box-shadow: var(--basement);
	height: 100%;
	display: flex;
	justify-content: flex-end;
`

export let Base = () => {
	return <Wrapper />
} 

Base.storyName = 'Basement'
