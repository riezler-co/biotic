import styled from 'styled-components'

export let CardGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, 280px);
	grid-gap: calc(var(--baseline) * 2);
	justify-content: center;

	@media screen and (max-width: 607px) {
		grid-template-columns: 1fr;
	}
`