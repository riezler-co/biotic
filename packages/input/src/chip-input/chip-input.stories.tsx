import { useState } from 'react'
import { ChipsInput } from '.'
import '../../style.css'

import styled from 'styled-components'

export default {
	title: 'Form/ChipsInput',
	component: ChipsInput
}

export let Default = () => {
	let [chips, setChips] = useState<Array<string>>([])
	let [focus, setFocus] = useState<number | null>(null)

	function handleDelete() {
		if (focus !== null) {
			setChips(chips.slice(0, chips.length - 1))
			setFocus(null)
		} else {
			setFocus(chips.length - 1)
		}
	}

	function handleCancel() {
		setFocus(null)
	}

	return (
		<StyledChipsInput
			onAdd={value => setChips([...chips, ...value])}
			onDelete={handleDelete}
			onCancelDelete={handleCancel}
		>
			{ chips.map((chip, index) =>
				<Chip focus={index === focus}>{chip}</Chip>)
			}
		</StyledChipsInput>
	)
}

let StyledChipsInput = styled(ChipsInput)`
	background: lightgrey;
`


let Chip = styled.span<{ focus: boolean }>`
	border: 1px solid black;
	background: #fff;
	border-radius: 4px;
	padding: 0px 8px;
	border-color: ${p => p.focus ? 'red' : 'black'};
`