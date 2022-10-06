import styled from 'styled-components'
import styles from '@biotic-ui/leptons/style/scrollbar.module.css'

let TBContent = styled.div.attrs({
	className: styles.scrollbar
})`
	overflow: auto;
`

let TBHeader = styled.header`
	padding: var(--baseline) calc(var(--baseline) * 2);
	border-bottom: var(--border);
	display: flex;
`

let TBWrapper = styled.div`
	display: grid;
	height: 100%;
	grid-template-rows: calc(var(--baseline) * 5) auto;
`

export let TopBar = {
	Wrapper: TBWrapper,
	Content: TBContent,
	Header: TBHeader
}