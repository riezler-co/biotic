import React from 'react';
import styled from 'styled-components'
import { Button } from '@biotic-ui/button'

import {
	Pencil,
	Trash,
} from 'phosphor-react'

import {
	Menu,
	MenuItem,
	Divider,
	MenuItemTitle,
	useMenu,
} from './main'


export default {
	title: 'Menu'
}

let Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	padding: 200px 0;
`

export const SimpleMenu = () =>	{
	return  (
		<Wrapper>
			<Menu>
				<MenuItem onClick={() => {}}>
					<MenuItemTitle>Menu</MenuItemTitle>
				</MenuItem>
				<Divider />
				<MenuItem>
					<MenuItemTitle>Edit</MenuItemTitle>
				</MenuItem>
				<MenuItem>
					<MenuItemTitle>Archive</MenuItemTitle>
				</MenuItem>
				<MenuItem>
					<MenuItemTitle>Delete</MenuItemTitle>
				</MenuItem>
			</Menu>
		</Wrapper>
	)
}

SimpleMenu.story = {
  name: 'Simple Menu',
};


export const WithIcon = () =>	{
	return  (
		<Wrapper>
			<Menu icon>
				<MenuItem onClick={() => {}} icon={<Pencil/>}>
					<MenuItemTitle>Menu</MenuItemTitle>
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
				</MenuItem>
			</Menu>
		</Wrapper>
	)
}

WithIcon.story = {
  name: 'With Icons',
};



export const WithSubmenu = () =>	{
	return  (
		<Wrapper>
			<Menu icon submenu>
				<MenuItem onClick={() => {}} icon={<Pencil/>}>
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
		</Wrapper>
	)
}

WithSubmenu.story = {
  name: 'With Submenu',
};


export const Popper = () =>	{
	let { MenuContainer, ref, ...props } = useMenu()

	return  (
		<Wrapper>

			<Button ref={ref} {...props}>Open</Button>
			<MenuContainer>
				<Menu>
					<MenuItem onClick={() => {}}>
						<MenuItemTitle>Menu</MenuItemTitle>
					</MenuItem>
					<Divider />
					<MenuItem onClick={() => false}>
						<MenuItemTitle>Prevent Close</MenuItemTitle>
					</MenuItem>
					<MenuItem>
						<MenuItemTitle>Archive</MenuItemTitle>
					</MenuItem>
					<MenuItem>
						<MenuItemTitle>Delete</MenuItemTitle>
					</MenuItem>
				</Menu>
			</MenuContainer>
		</Wrapper>
	)
}

Popper.story = {
  name: 'useMenu',
};

export const PopperWithSubmenu = () =>	{
	let { MenuContainer, ...props } = useMenu()

	return  (
		<Wrapper>
			
			<Button {...props}>Open</Button>

			<MenuContainer>
				<Menu icon submenu>
					<MenuItem onClick={() => {}} icon={<Pencil/>}>
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
			</MenuContainer>
		</Wrapper>
	)
}

PopperWithSubmenu.story = {
  name: 'useMenu With Submenu',
};


export const Replace = () =>	{
	let { MenuContainer, ...props } = useMenu()

	return  (
		<Wrapper>
			
			<Button {...props}>Open</Button>

			<MenuContainer>
				<Menu icon submenu replace>
					<MenuItem onClick={() => {}} icon={<Pencil/>}>
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
			</MenuContainer>
		</Wrapper>
	)
}

Replace.story = {
  name: 'Replace Submenu',
};