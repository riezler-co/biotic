import styled from 'styled-components'
import { InputBase } from '@biotic-ui/leptons'

export let Select = styled.select`
	${InputBase}
`

export let Option = styled.option`
	background-color: var(--option-background, #fff);
	color: var(--option-color, #000);
`