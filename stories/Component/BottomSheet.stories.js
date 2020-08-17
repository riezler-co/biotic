import React from 'react';
import styled from 'styled-components'
import { BottomSheet, SheetHeader, SheetTitle, SheetContent } from '@package/bottom-sheet/main'
import { Menu, MenuItem, Divider, MenuItemTitle, useMenu } from '@package/menu/main'
import EditIcon from '../assets/edit_icon'
import DeleteIcon from '../assets/delete_icon'

export default {
	title: 'Component/Bottom Sheet',
	component: BottomSheet
}

export let Sheet = () => {
	let [open, setOpen] = React.useState(false)

	return (
		<React.Fragment>
			<button onClick={() => setOpen(true)}>Open Sheet</button>
			<BottomSheet open={open} height={0.3} onClose={() => setOpen(false)}>
				<SheetHeader>
					<button onClick={() => setOpen(false)}>Close</button>
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