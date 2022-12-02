import { css } from '@emotion/css'

export let StyledTabBar = css`
	display: flex;
	height: calc(var(--size-2) * 4);
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

export let StyledTabContent = css`
	overflow: auto;
`

export let StyledTab = css`
	border: none;
	min-width: calc(var(--size-2) * 10);
	max-width: calc(var(--size-2) * 38);
	background: none;
	cursor: pointer;
	height: 100%;

	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;

	&:focus {
	  outline: var(--tab-focus, none);
	}
`

export let StyledTabs = css`
	display: grid;
	height: 100%;
	grid-template-rows: calc(var(--size-2) * 4) auto!important;
`