import React from 'react'
import styled from 'styled-components';
import { Select, Option, Optgroup } from '@package/select/main'

export default {
	title: 'Form/Select',
	component: Select
}

export let Default = () => {

	return (
		<Select>
			<Option>Hillary Hahn</Option>
			<Option>Ray Chen</Option>
			<Option>James Ehnes</Option>
		</Select>
	)
}

Default.storyName = 'Default'


export let WithOptgroup = () => {

	return (
		<Select>
			<Optgroup label="Fuu Bar">
				<Option>Hillary Hahn</Option>
				<Option>Ray Chen</Option>
				<Option>James Ehnes</Option>
			</Optgroup>
		</Select>
	)
}

WithOptgroup.storyName = 'Optgroup'

export let Styeld = () => {

	return (
		<StyledSelect multiple size={5}>
			<Option>Fuu Bar</Option>
			<Optgroup label="Optgroup">
				<Option>Hillary Hahn</Option>
				<Option>Ray Chen</Option>
				<Option>James Ehnes</Option>
			</Optgroup>
			
			<Optgroup label="Optgroup">
				<Option>Hillary Hahn</Option>
				<Option>Ray Chen</Option>
				<Option>James Ehnes</Option>
			</Optgroup>
		</StyledSelect>
	)
}

let StyledSelect = styled(Select)`
	--input-border: 1px solid #000;
	--input-color: #fff;
	--input-bg: #222043;
`