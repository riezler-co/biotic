import styled from 'styled-components'
import { InputBase } from '@biotic-ui/leptons'

export let Select = styled.select`
	${InputBase}
	block-size: ${p => p.multiple ? 'auto' : 'var(--baseline-4)'};
`

export let Option = styled.option`
	background-color: var(--option-background, inherit);
	color: var(--option-color, inherit);
`

export let Optgroup = styled.optgroup`
	background-color: var(--optgroup-background, inherit);
	color: var(--optgroup-color, inherit);
`