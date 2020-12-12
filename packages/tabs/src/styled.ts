import styled from 'styled-components'
import { Scrollbar } from '@biotic-ui/leptons'

export let StyledTabBar = styled.header`
	display: flex;
	height: calc(var(--baseline) * 4);
	padding: 0;
	width: 100%;
	background: var(--tab-bar-background, grey);
	overflow: auto;
	-ms-overflow-style: none;  /* IE and Edge */
	scrollbar-width: none;  /* Firefox */
	&::-webkit-scrollbar {
	  display: none;
	}
`

export let StyledTabContent = styled.div`
	overflow: auto;
	${Scrollbar}
`

export let StyledTab = styled.button`
	border: none;
	min-width: calc(var(--baseline) * 10);
	max-width: calc(var(--baseline) * 38);
	background: none;
	cursor: pointer;
	height: 100%;

	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;

	:focus {
	  outline: var(--tab-focus, none);
	}
`

export let StyledTabs = styled.div`
	display: grid;
	height: 100%;
	grid-template-rows: calc(var(--baseline) * 4) auto!important;
`