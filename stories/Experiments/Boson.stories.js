import { boson, useBoson, useSelector } from '@package/boson/main'

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
			<button onClick={() => setState(c => c + 1)}>
				+
			</button>
			<button onClick={() => setState(state - 1)}>
				-
			</button>
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