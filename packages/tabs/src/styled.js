import styled from 'styled-components'
import { TopBar } from '@biotic-ui/layout'

export let StyledTabBar = styled(TopBar.Header)`
	height: calc(var(--baseline) * 4);
	padding: 0!important;
	width: 100%;
	background: grey;
	overflow: auto;
	-ms-overflow-style: none;  /* IE and Edge */
	scrollbar-width: none;  /* Firefox */
	&::-webkit-scrollbar {
	  display: none;
	}
`

export let StyledTabContent = styled(TopBar.Content)`
`

export let Tab = styled.button`
`

export let StyledTabs = styled(TopBar.Wrapper)`
	grid-template-rows: calc(var(--baseline) * 4) auto!important;
`