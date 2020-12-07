import React from 'react'
import styled from 'styled-components'
import { Input, Section, Password } from '@package/input/main'
import { Button } from '@package/button/main'

let Wrapper = styled.div`
	max-width: 37em;
	margin: 0 auto;
`

export default {
	title: 'Util/Grid',	
}

export let Text = () =>  {
	return (
		<Wrapper>
			<h1>Headline 1</h1>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda expedita beatae, sed, obcaecati velit praesentium tenetur facere quibusdam ipsam vero.
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda expedita beatae, sed, obcaecati velit praesentium tenetur facere quibusdam ipsam vero.
			</p>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda expedita beatae, sed, obcaecati velit praesentium tenetur facere quibusdam ipsam vero.
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda expedita beatae, sed, obcaecati velit praesentium tenetur facere quibusdam ipsam vero.
			</p>

			<h2>Headline 2</h2>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda expedita beatae, sed, obcaecati velit praesentium tenetur facere quibusdam ipsam vero.
			</p>

			<h3>Headline 3</h3>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda expedita beatae, sed, obcaecati velit praesentium tenetur facere quibusdam ipsam vero.
			</p>

			<h4>Headline 4</h4>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda expedita beatae, sed, obcaecati velit praesentium tenetur facere quibusdam ipsam vero.
			</p>
		</Wrapper>
	)
}

export let Form = () => {
	return (
		<Wrapper>
			<form>
				<Section>
					<label>Email: </label>
					<Input />
				</Section>
				<Section>
					<label>Password: </label>
					<Password />
				</Section>
				<Button>Login</Button>
			</form>
		</Wrapper>
	)
}