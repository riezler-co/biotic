import React from 'react'
import EditIcon from '../assets/edit_icon'
import DeleteIcon from '../assets/delete_icon'

import { SidebarLayout
			 , Aside
			 , Main
			 } from '@package/layout/main'

import { Menu
	   	 , MenuItem
	   	 , Divider
	   	 , MenuItemTitle
	   	 , useMenu
	   	 } from '@package/menu/main'


import { Button } from '@package/button/main'

export default {
	title: 'Layout/Sidebar'
}

export let Default = () => {
	let [open, setOpen] = React.useState(true)

	return (
		<SidebarLayout>
			<Aside open={open} drawer='(max-width: 900px)' onClose={() => setOpen(false)}>
				<h2>Aside</h2>
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
			</Aside>
			<Main>
				<Button onClick={() => setOpen(!open)}>Toggle Aside</Button>
				
				<h1>Main</h1>

				<div style={{ height: '30vh', background: '#f0f', marginBottom: '20px'}}></div>
				<div style={{ height: '30vh', background: '#f0f', marginBottom: '20px'}}></div>
				<div style={{ height: '30vh', background: '#f0f', marginBottom: '20px'}}></div>
				<div style={{ height: '30vh', background: '#f0f', marginBottom: '20px'}}></div>
				<div style={{ height: '30vh', background: '#f0f', marginBottom: '20px'}}></div>
				<div style={{ height: '30vh', background: '#f0f', marginBottom: '20px'}}></div>
				<div style={{ height: '30vh', background: '#f0f', marginBottom: '20px'}}></div>
			</Main>
		</SidebarLayout>
	)
}

Default.storyName = 'Default'

export let Nested = () => {
	let [openInner, setOpenInner] = React.useState(true)
	let [openOuter, setOpenOuter] = React.useState(true)

	return (
		<SidebarLayout>
			<Aside open={openOuter} drawer='(max-width: 1150px)' onClose={() => setOpenOuter(false)}>
				<h2>Outer</h2>
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
			</Aside>
			<Main>
				<SidebarLayout>
					<Aside open={openInner} drawer='(max-width: 900px)' onClose={() => setOpenInner(false)}>
						<h2>Inner</h2>
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
					</Aside>
					<Main>
						<Button onClick={() => setOpenOuter(!openOuter)}>Toggle Outer</Button>
						<Button onClick={() => setOpenInner(!openInner)}>Toggle Inner</Button>
						
						<h1>Main</h1>

						<div style={{ height: '30vh', background: '#f0f', marginBottom: '20px'}}></div>
						<div style={{ height: '30vh', background: '#f0f', marginBottom: '20px'}}></div>
						<div style={{ height: '30vh', background: '#f0f', marginBottom: '20px'}}></div>
						<div style={{ height: '30vh', background: '#f0f', marginBottom: '20px'}}></div>
						<div style={{ height: '30vh', background: '#f0f', marginBottom: '20px'}}></div>
						<div style={{ height: '30vh', background: '#f0f', marginBottom: '20px'}}></div>
						<div style={{ height: '30vh', background: '#f0f', marginBottom: '20px'}}></div>
					</Main>
				</SidebarLayout>
			</Main>
		</SidebarLayout>
	)
}

Nested.storyName = 'Nested'