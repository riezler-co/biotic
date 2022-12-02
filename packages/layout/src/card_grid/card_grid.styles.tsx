import { css } from '@emotion/css'

export let cardGrid = css`
	display: grid;
	grid-template-columns: repeat(auto-fit, 280px);
	grid-gap: var(--size-3);
	justify-content: center;

	@media screen and (max-width: 607px) {
		& {
			grid-template-columns: 1fr;
		}
	}
`
