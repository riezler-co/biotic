import { useEffect, useState } from 'react'
import Db, { Changes } from '@package/db/main'

import { Input } from '@package/input/main'
import { Button } from '@package/button/main'
import { useForm } from '@package/std/main'

import { toArray } from 'rxjs/operators'

export default {
	title: 'Experiment/DB',
	argTypes: {},
}

let db = new Db('test', { version: 1})

let todos = db.tableCreate({
	name: 'todos',
	version: 1,
	indicies: ['done', 'created_at'],

	onGet(item) {
		console.log('GET: ', item)
	},

	onInsert(item) {
		console.log('INSERT: ', item)
	},

	onUpdate(item) {
		console.log('UPDATE: ', item)
	},

	onDelete(item) {
		console.log('DELETE: ', item)
	},

	onWrite(item) {
		console.log('WRITE: ', item)
	},
})

function useTodos(argument) {
	let [state, setState] = useState([])

	useEffect(() => {
		let sub = todos.getAll()
			.pipe(toArray())
			.subscribe(items => setState(items))

		return () => {
			sub.unsubscribe()
		}
	}, [setState])

	useEffect(() => {
		let sub = todos.changes().subscribe(change => {
			console.log({ change })
			switch (change.type) {
				case Changes.Insert:
					setState(state => [...state, change.data.newValue])
				break

				case Changes.Update:
					setState(state => {
						let index = state.findIndex(item => {
							return item.id === change.id
						})

						return [
							...state.slice(0, index),
							change.data.newValue,
							...state.slice(index + 1),
						]
					})
				break

				case Changes.Delete:
					setState(state => state.filter(item => item.id !== change.id))
				break
			}
		})

		return () => {
			sub.unsubscribe()
		}
	}, [setState])

	return state
}

export let Todos = () => {
	let items = useTodos()

	let [form, setForm, resetForm] = useForm({ todo: '' })

	function handleSubmit(e) {
		e.preventDefault()

		todos
			.insert({
				id: getId(),
				title: form.todo,
				done: false,
				created_at: new Date(),
			})
			.subscribe(() => {
				resetForm({ todo: '' })
			})

	}

	return (
		<div>
			<h1>Todos:</h1>

			<ul>
				{ items.map(todo => <Todo key={todo.id} todo={todo} />)}
			</ul>

			<form onSubmit={handleSubmit}>
				<Input
					name='todo'
					value={form.todo}
					onChange={setForm}
				/>
				<Button>Create</Button>
			</form>

		</div>
	)
}

let Todo = ({ todo }) => {
	
	let [form, setForm] = useForm({
		title: todo.title
	})

	let [edit, setEdit] = useState(false)
	
	function toggleDone() {
		todos
			.update(todo.id, {
				...todo,
				done: !todo.done
			})
			.subscribe()
	}

	function handleDelete() {
		todos
			.delete(todo.id)
			.subscribe()
	}

	function handleSave(e) {
		if (e.key === 'Enter') {
			e.stopPropagation()
			e.preventDefault()

			todos
				.update(todo.id, todo => {
					return {
						...todo,
						title: form.title
					}
				})
				.subscribe(() => setEdit(false))
		}
	}

	return (
		<li>
			<input
				type='checkbox'
				checked={todo.done}
				onChange={toggleDone}
			/>

			{ edit &&
				<input
					name='title'
					value={form.title}
					onChange={setForm}
					onKeyDown={handleSave}
				/>
			}

			{ !edit &&
				<span onDoubleClick={() => setEdit(true)} >{todo.title}</span>
			}

			<button onClick={handleDelete}>Delete</button>
		</li>
	)
}


// https://gist.github.com/gordonbrander/2230317
// only used for this story
let getId = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};