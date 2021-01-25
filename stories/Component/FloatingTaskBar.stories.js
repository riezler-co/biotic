import React from 'react';
import styled from 'styled-components'
import { FloatingTaskBar, Task, TaskLabel, Position } from '@package/floating-task-bar/main'
import { Button } from '@package/button/main'
import EditIcon from '../assets/edit_icon'
import DeleteIcon from '../assets/delete_icon'

export default {
	title: 'Component/Floating Task Bar',
	component: FloatingTaskBar,
}

export let Bottom = () => {
	let [open, setOpen] = React.useState(false)

	return (
		<div>
			<Button onClick={() => setOpen(!open)}>Toggle</Button>
			<FloatingTaskBar open={open} onClose={() => setOpen(false)}>
				<Task>
					<EditIcon />
					<TaskLabel>Edit</TaskLabel>
				</Task>
				<Task>
					<DeleteIcon />
					<TaskLabel>Delete</TaskLabel>
				</Task>
				<Task>
					<DeleteIcon />
					<TaskLabel>Delete</TaskLabel>
				</Task>
			</FloatingTaskBar>
		</div>
	)
}

export let Backdrop = () => {
	let [open, setOpen] = React.useState(false)

	return (
		<div>
			<Button onClick={() => setOpen(!open)}>Toggle</Button>
			<FloatingTaskBar open={open} onClose={() => setOpen(false)} backdrop>
				<Task>
					<EditIcon />
					<TaskLabel>Edit</TaskLabel>
				</Task>
				<Task>
					<DeleteIcon />
					<TaskLabel>Delete</TaskLabel>
				</Task>
				<Task>
					<DeleteIcon />
					<TaskLabel>Delete</TaskLabel>
				</Task>
			</FloatingTaskBar>
		</div>
	)
}

export let Top = () => {
	let [open, setOpen] = React.useState(false)

	return (
		<div>
			<Button onClick={() => setOpen(!open)}>Toggle</Button>
			<FloatingTaskBar open={open} onClose={() => setOpen(false)} position={Position.Top}>
				<Task>
					<EditIcon />
					<TaskLabel>Edit</TaskLabel>
				</Task>
				<Task>
					<DeleteIcon />
					<TaskLabel>Delete</TaskLabel>
				</Task>
			</FloatingTaskBar>
		</div>
	)
}

export let Left = () => {
	let [open, setOpen] = React.useState(false)

	return (
		<div>
			<Button onClick={() => setOpen(!open)}>Toggle</Button>
			<FloatingTaskBar open={open} onClose={() => setOpen(false)} position={Position.Left}>
				<Task>
					<EditIcon />
					<TaskLabel>Edit</TaskLabel>
				</Task>
				<Task>
					<DeleteIcon />
					<TaskLabel>Delete</TaskLabel>
				</Task>
			</FloatingTaskBar>
		</div>
	)
}

export let Right = () => {
	let [open, setOpen] = React.useState(false)

	return (
		<div>
			<Button onClick={() => setOpen(!open)}>Toggle</Button>
			<FloatingTaskBar open={open} onClose={() => setOpen(false)} position={Position.Right}>
				<Task>
					<EditIcon />
					<TaskLabel>Edit</TaskLabel>
				</Task>
				<Task>
					<DeleteIcon />
					<TaskLabel>Delete</TaskLabel>
				</Task>
			</FloatingTaskBar>
		</div>
	)
}
