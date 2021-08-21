import React from 'react'
import { ChipsInput } from '@package/input/main'

import styled from 'styled-components'

export default {
	title: 'Form/ChipsInput',
	component: ChipsInput
}

export let Default = () => {
	let [chips, setChips] = React.useState([])
	let [focus, setFocus] = React.useState(null)

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


let Chip = styled.span`
	border: 1px solid black;
	background: #fff;
	border-radius: 4px;
	padding: 2px;
	border-color: ${p => p.focus ? 'red' : 'black'};
`