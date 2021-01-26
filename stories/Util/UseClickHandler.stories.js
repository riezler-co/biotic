import React, { useRef } from 'react'
import styled from 'styled-components'
import { useClickHandler } from '@package/std/main'
import { Button } from '@package/button/main'
import { action } from '@storybook/addon-actions'

export default {
	title: 'Util/Hooks',
}


export let OnClickHandler = () => {
	let onClick = useClickHandler({
		onClick: () => action('Click')(),
		onDblClick: () => action('Double Click')(),
	}, 200)

	return (
		<Button onClick={onClick}>Click</Button>
	)
}

