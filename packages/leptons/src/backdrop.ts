import styled from 'styled-components'

type Props =
	{ open: boolean;
	}

export let Backdrop = styled.div<Props>`
	background: var(--backdrop, rgba(63, 63, 63, 0.1));
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: var(--background-z-index, 10);

	${p => !p.open && `
		pointer-events: none;
	`}
`