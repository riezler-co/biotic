import React from 'react';
import styled from 'styled-components'
import EditIcon from '../assets/edit_icon'
import DeleteIcon from '../assets/delete_icon'

import { Drawer } from '@package/drawer/src/main'
import { Menu
	   	 , MenuItem
	   	 , Divider
	   	 , MenuItemTitle
	   	 , useMenu
	   	 } from '@package/menu/src/main'

export default {
	title: 'Component/Drawer',
	component: Drawer
}

export let Left = () => {
	let [open, setOpen] = React.useState(true)

	return (
		<React.Fragment>
			<button onClick={() => setOpen(true)}>Open Drawer</button>

			<div style={{ height: '110vh', background: 'grey' }}></div>

			<Drawer open={open} maxWidth={400} onClose={() => setOpen(false)}>
				<div>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum dolores, sit odio nesciunt enim earum quod iusto molestias, quos excepturi.
				</div>
			</Drawer>
		</React.Fragment>
	)
}

Left.story = {
	name: 'Left Drawer'
}

export let Right = () => {
	let [open, setOpen] = React.useState(false)

	return (
		<React.Fragment>
			<button onClick={() => setOpen(true)}>Open Drawer</button>
			<Drawer open={open} maxWidth={400} onClose={() => setOpen(false)} left={false}>
				<div>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum dolores, sit odio nesciunt enim earum quod iusto molestias, quos excepturi.
				</div>
			</Drawer>
		</React.Fragment>
	)
}

Right.story = {
	name: 'Right Drawer'
}

export let Fullscreen = () => {
	let [open, setOpen] = React.useState(false)

	return (
		<React.Fragment>
			<button onClick={() => setOpen(true)}>Open Drawer</button>
			<Drawer open={open} onClose={() => setOpen(false)}>
				<button onClick={() => setOpen(false)}>Close</button>
				<div>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum dolores, sit odio nesciunt enim earum quod iusto molestias, quos excepturi.
				</div>
			</Drawer>
		</React.Fragment>
	)
}

Fullscreen.story = {
	name: 'Fullscreen Drawer'
}

export let MenuDrawer = () => {
	let [open, setOpen] = React.useState(false)

	return (
		<React.Fragment>
			<button onClick={() => setOpen(true)}>Open Drawer</button>
			<Drawer open={open} maxWidth={300} onClose={() => setOpen(false)}>
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
			</Drawer>
		</React.Fragment>
	)
}

MenuDrawer.story = {
	name: 'Menu Drawer'
}