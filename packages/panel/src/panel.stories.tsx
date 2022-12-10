import { useState } from 'react'
import styled from 'styled-components'
import { Panel, StackedPanels } from './main'
import '@biotic-ui/leptons/style/base.css'
import '../style.css'

export default {
	title: 'Experiment/Panel',
	argTypes: {},
}

let Wrapper = styled.div`
	box-shadow: var(--basement);
	height: 100%;
	display: flex;
	justify-content: flex-end;
`

export let MainPanel = () => {
	return (
		<Wrapper>
			<Panel>
				<Content />
			</Panel>
		</Wrapper>
	)
}

export let MultiplePanels = () => {
	return (
		<Wrapper>
			<Panel>
				<Content />
			</Panel>
			<Panel>
				<Content />
			</Panel>
		</Wrapper>
	)
}


export let Stacked = () => {

	let [items, setItems] = useState(['One', 'Two', 'Three', 'Four'])


	return (
		<Wrapper>
			<div style={{ width: 300 }}></div>
			<StyledStacked onActivate={setItems}>
				{ items.map(item => 
					<Panel key={item} id={item}>
						<h2>{item}</h2>
						<Content />
					</Panel>
				)}
			</StyledStacked>
		</Wrapper>
	)
}

let StyledStacked = styled(StackedPanels)`
	width: 70vw;
`

let Content = styled.div`
	width: 400px;
`