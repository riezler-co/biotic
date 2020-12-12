import React from 'react'
import styled from 'styled-components'

export default {
	title: 'Util/Color'
}


export let Dracula = () => {
	return (
		<Wrapper>
			<Box background='var(--green)'>
				--green
			</Box>
			<Box background='var(--orange)'>
				--orange
			</Box>
			<Box background='var(--pink)'>
				--pink
			</Box>
			<Box background='var(--purple)'>
				--purple
			</Box>
			<Box background='var(--red)'>
				--red
			</Box>
			<Box background='var(--foreground)'>
				--foreground
			</Box>
			<Box background='var(--active)'>
				--active
			</Box>
			<Box background='var(--muted)'>
				--muted
			</Box>
			<Box background='var(--cyan)'>
				--cyan
			</Box>
			<Box background='var(--magenta)'>
				--magenta
			</Box>
			<Box background='var(--yellow)'>
				--yellow
			</Box>
			<Box background='var(--blue)'>
				--blue
			</Box>
			<Box background='var(--color-error)'>
				--color-error
			</Box>
			<Box background='var(--background)' style={{ border: '1px solid var(--foreground)'}}>
				--background
			</Box>
		</Wrapper>
	)
}

let Wrapper = styled.div`
	--size: calc(var(--baseline-5) * 5);
	display: grid;
	grid-template-columns: repeat(5, var(--size));
	grid-auto-rows: var(--size);
	grid-gap: var(--baseline-2);
	padding: var(--baseline-2);
	height: 100%;
	background: var(--background);
	justify-content: center;
`

let Box = styled.div`
	background: ${p => p.background};
	padding: var(--baseline-2);
`