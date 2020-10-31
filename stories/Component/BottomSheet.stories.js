import React from 'react';
import styled from 'styled-components'
import { BottomSheet, SheetHeader, SheetTitle, SheetContent } from '@package/bottom-sheet/main'
import { Menu, MenuItem, Divider, MenuItemTitle, useMenu } from '@package/menu/main'
import EditIcon from '../assets/edit_icon'
import DeleteIcon from '../assets/delete_icon'
import { Button } from '@package/button/main'

export default {
	title: 'Component/Bottom Sheet',
	component: BottomSheet
}

export let Sheet = () => {
	let [open, setOpen] = React.useState(false)

	return (
		<React.Fragment>
			<Button onClick={() => setOpen(true)}>Open Sheet</Button>
			<BottomSheet open={open} height={0.3} onClose={() => setOpen(false)}>
				<SheetHeader>
					<Button onClick={() => setOpen(false)}>Close</Button>
					<SheetTitle>Bottom Sheet</SheetTitle>
				</SheetHeader>
				<SheetContent>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum dolores, sit odio nesciunt enim earum quod iusto molestias, quos excepturi.
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum dolores, sit odio nesciunt enim earum quod iusto molestias, quos excepturi.
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum dolores, sit odio nesciunt enim earum quod iusto molestias, quos excepturi.
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum dolores, sit odio nesciunt enim earum quod iusto molestias, quos excepturi.
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum dolores, sit odio nesciunt enim earum quod iusto molestias, quos excepturi.
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum dolores, sit odio nesciunt enim earum quod iusto molestias, quos excepturi.
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum dolores, sit odio nesciunt enim earum quod iusto molestias, quos excepturi.
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum dolores, sit odio nesciunt enim earum quod iusto molestias, quos excepturi.
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum dolores, sit odio nesciunt enim earum quod iusto molestias, quos excepturi.
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum dolores, sit odio nesciunt enim earum quod iusto molestias, quos excepturi.
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum dolores, sit odio nesciunt enim earum quod iusto molestias, quos excepturi.
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum dolores, sit odio nesciunt enim earum quod iusto molestias, quos excepturi.
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum dolores, sit odio nesciunt enim earum quod iusto molestias, quos excepturi.
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum dolores, sit odio nesciunt enim earum quod iusto molestias, quos excepturi.
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum dolores, sit odio nesciunt enim earum quod iusto molestias, quos excepturi.
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum dolores, sit odio nesciunt enim earum quod iusto molestias, quos excepturi.
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum dolores, sit odio nesciunt enim earum quod iusto molestias, quos excepturi.
				</SheetContent>
			</BottomSheet>
		</React.Fragment>
	)
}

Sheet.story = {
	name: 'Simple Sheet'
}

export let Dynamic = () => {
	let [children, setChildren] = React.useState([
		<li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum dolores, sit odio nesciunt enim earum quod iusto molestias, quos excepturi.</li>
	])

	let [open, setOpen] = React.useState(false)

	function addChild() {
		setChildren([
			...children,
			<li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum dolores, sit odio nesciunt enim earum quod iusto molestias, quos excepturi.</li>
		])
	}

	function add100(argument) {
		let items = []

		for(let i = 0; i < 100; i = i + 1) {
			items.push(
				<li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum dolores, sit odio nesciunt enim earum quod iusto molestias, quos excepturi.</li>
			)
		}

		setChildren([
			...children,
			...items
		])
	}

	return (
		<React.Fragment>
			<Button onClick={addChild}>Add child</Button>
			<Button onClick={add100}>Add 100</Button>
			<Button onClick={() => setOpen(true)}>Open Sheet</Button>
			<BottomSheet scrollable open={open} minHeight={0.8} onClose={() => setOpen(false)}>
				<SheetHeader>
					<Button onClick={() => setOpen(false)}>Close</Button>
					<SheetTitle>Bottom Sheet</SheetTitle>
				</SheetHeader>
				<SheetContent>
					<ul style={{ marginBottom: 0 }}>
						{ children }
					</ul>
				</SheetContent>
			</BottomSheet>
		</React.Fragment>
	)
}

Dynamic.story = {
	name: 'Dynamic Content Sheet'
}

export let SheetMenu = () => {
	return (
		<React.Fragment>
			<BottomSheet open>
				<Menu icon submenu replace>
					<MenuItem onClick={() => {}} icon={<EditIcon/>}>
						<MenuItemTitle>Menu</MenuItemTitle>
						<Menu icon>
							<MenuItem>
								<MenuItemTitle>Fuu</MenuItemTitle>
							</MenuItem>
							<MenuItem icon={<DeleteIcon />}>
								<MenuItemTitle>Bar</MenuItemTitle>
							</MenuItem>
							<MenuItem>
								<MenuItemTitle>Baz</MenuItemTitle>
							</MenuItem>
						</Menu>
					</MenuItem>
					<Divider />
					<MenuItem icon={<DeleteIcon />}>
						<MenuItemTitle>Fuu</MenuItemTitle>
					</MenuItem>
					<MenuItem>
						<MenuItemTitle>Bar</MenuItemTitle>
					</MenuItem>
					<MenuItem>
						<MenuItemTitle>Baz</MenuItemTitle>
						<Menu icon>
							<MenuItem>
								<MenuItemTitle>Fuu</MenuItemTitle>
							</MenuItem>
							<MenuItem icon={<DeleteIcon />}>
								<MenuItemTitle>Bar</MenuItemTitle>
							</MenuItem>
							<MenuItem>
								<MenuItemTitle>Baz</MenuItemTitle>
							</MenuItem>
						</Menu>
					</MenuItem>
				</Menu>
			</BottomSheet>
		</React.Fragment>
	)
}

SheetMenu.story = {
	name: 'Sheet Menu'
}