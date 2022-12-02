import '@biotic-ui/leptons/style/base.css'
import { useState } from 'react'
import {
	Menu,
	MenuItem,
	MenuItemTitle,
	Divider
} from '@biotic-ui/menu'
import { Trash, Pencil } from 'phosphor-react'
import {
	SidebarLayout,
	Aside,
	Main,
} from './index'

export default {
	title: 'Layout/Sidebar'
}

export let Default = () => {
	let [open, setOpen] = useState(true)

	return (
		<SidebarLayout>
			<Aside
				drawer='(max-width: 500px)'
				open={open}
				onClose={() => setOpen(false)}>
				<h2>Aside</h2>
				<Menu icon submenu replace>
					<MenuItem onClick={() => {}} icon={<Pencil />}>
						<MenuItemTitle>Menu</MenuItemTitle>
						<Menu icon>
							<MenuItem>
								<MenuItemTitle>Fuu</MenuItemTitle>
							</MenuItem>
							<MenuItem icon={<Trash />}>
								<MenuItemTitle>Bar</MenuItemTitle>
							</MenuItem>
							<MenuItem>
								<MenuItemTitle>Baz</MenuItemTitle>
							</MenuItem>
						</Menu>
					</MenuItem>
					<Divider />
					<MenuItem icon={<Trash />}>
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
							<MenuItem icon={<Trash />}>
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
				<h1>Main</h1>
				<button onClick={() => setOpen(o => !o)}>
					Toggle Open
				</button>
			</Main>
		</SidebarLayout>
	)
}