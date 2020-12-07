import React, { useState, FC } from 'react'
import styled from 'styled-components'
import { InputBase } from '@biotic-ui/leptons'

let StyledInput = styled.input`
  ${InputBase}
`

export let Input = StyledInput

export let Password: FC<{}> = (props) => {
	let [type, setType] = useState<'password' | 'text'>('password')

	function handleShow() {
		setType('text')
	}

	function handleHide() {
		setType('password')
	}

	return (
		<PasswordWrapper>
			<StyledInput {...props} type={type} />
			<Button type="button" onMouseDown={handleShow} onMouseUp={handleHide}>
				{ type === 'password' &&
					<Eye />				
				}

				{ type === 'text' &&
					<EyeClosed />				
				}
			</Button>
		</PasswordWrapper>
	)
}

let PasswordWrapper = styled.div`
	position: relative;
	display: flex;
	align-items: center;
`

let Button = styled.button`
	background: none;
	border: none;
	outline: none;
	position: absolute;
	right: var(--baseline);
	z-index: 5;
	background: var(--input-bg, none);
`

let Eye = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256">
			<rect width="256" height="256" fill="none"></rect>
			<path d="M128,55.99219C48,55.99219,16,128,16,128s32,71.99219,112,71.99219S240,128,240,128,208,55.99219,128,55.99219Z" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path><circle cx="128" cy="128.00061" r="40" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></circle>
		</svg>
	)
}

let EyeClosed = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000000" viewBox="0 0 256 256">
			<rect width="256" height="256" fill="none"></rect><line x1="201.14971" y1="127.30467" x2="223.95961" y2="166.81257" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="154.18201" y1="149.26298" x2="161.29573" y2="189.60689" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="101.72972" y1="149.24366" x2="94.61483" y2="189.59423" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><line x1="54.80859" y1="127.27241" x2="31.88882" y2="166.97062" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></line><path d="M31.99943,104.87509C48.81193,125.68556,79.63353,152,128,152c48.36629,0,79.18784-26.31424,96.00039-47.12468" fill="none" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16"></path>
		</svg>
	)
}