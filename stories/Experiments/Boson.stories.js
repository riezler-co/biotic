import { useState } from 'react'
import { boson, useBoson, useSelector, useQuery, bosonFamily } from '@package/boson/main'
import { Button } from '@package/button/main'

export default {
	title: 'Experiment/Boson',
	argTypes: {},
}

let counter = boson({
	key: 'counter',
	defaultValue: 0
})

let Elm = () => {
	let [state, setState] = useBoson(counter)

	return (
		<div style={{ marginBottom: 32 }}>
			<p style={{ marginBottom: 8 }}>Counter: { state }</p>
			<Button onClick={() => setState(c => c + 1)}>
				+
			</Button>
			<Button onClick={() => setState(state - 1)}>
				-
			</Button>
		</div>
	)
}

export let Counter = () => {

	let count = useSelector(counter, (c) => {
		console.log('useSelector')
		return c
	})

	return (
		<div>
			<h1>{ count }</h1>
			<Elm />
			<Elm />
		</div>
	)
}

let todosFamily = bosonFamily(() => {
	return {
		defaultValue: undefined,
	}
})

export let Query = () => {
	let [id, setId] = useState('1')

	let [todo, action] = useQuery(todosFamily(id), async () => {
		await wait()
		let res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
  		return res.json()
	})

	return (
		<div>
			<button onClick={action.reload}>Reload</button>
			<select value={id} onChange={e => setId(e.target.value)}>
				<option>1</option>
				<option>2</option>
				<option>3</option>
			</select>

			{ todo.state === 'loading' &&
				<p>...loading</p>
			}
			<div>
				<h1>{ todo.data?.title }</h1>
			</div>

			<input
				value={todo.data?.title ?? ''}
				onChange={e => action.set({ title: e.target.value })}
			/>
			<button onClick={() => action.reset()}>Reset</button>
		</div>
	)
}


function wait() {
	return new Promise(resolve => {
		setTimeout(resolve, 2000)
	})
}
