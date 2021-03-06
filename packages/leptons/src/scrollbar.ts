import { css } from 'styled-components'

export let Scrollbar = css`
	
	--default-thumb-color: #909090;
	--default-track-color: #e9e8f3;

	scrollbar-color: var(--scrollbar-track, var(--default-track-color)) var(--scrollbar-thumb, var(--default-thumb-color));
	scrollbar-width: thin; 

	&::-webkit-scrollbar-track {
		background-color: var(--scrollbar-track, var(--default-track-color));
	}

	&::-webkit-scrollbar {
    width: var(--baseline);
    height: var(--baseline);
    background-color: var(--scrollbar-track, var(--default-track-color));
	}

	&::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-thumb, var(--default-thumb-color));
    border-radius: 0;
	}

	&::-webkit-scrollbar-corner {
		background-color: var(--scrollbar-thumb, var(--default-thumb-color));
	}
`