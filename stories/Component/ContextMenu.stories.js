import React from 'react';
import styled from 'styled-components'
import EditIcon from '../assets/edit_icon'
import DeleteIcon from '../assets/delete_icon'

import { useContextMenu } from '@package/context-menu/main'
import { Menu
			 , MenuItem
			 , Divider
			 , MenuItemTitle
			 } from '@package/menu/main'

export default {
  title: 'Component/Context Menu',
  component: Menu,
};

let ItemWrapper = styled.div`
	display: flex;
	justify-content: ${p => p.justify === 'right' ? 'flex-end' : 'flex-start' };
	align-items: ${p => p.align === 'bottom' ? 'flex-end' : 'flex-start' };
`

let Item = ({ title, justify, align }) => {
	let { ContextMenu, ...props } = useContextMenu()

	return (
		<React.Fragment>
			<ItemWrapper justify={justify} align={align}>
				<span {...props}>{ title }</span>
			</ItemWrapper>
			<ContextMenu>
				<Menu icon submenu>
					<MenuItem onClick={() => {}} icon={<EditIcon/>}>
						<MenuItemTitle>{ title }</MenuItemTitle>
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
			</ContextMenu>
		</React.Fragment>
	)
}

let Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-rows: 1fr 1fr 1fr;
	height: 150vh;
	width: 120vw;
`

export const ToStorybook = () =>	{
	let { ContextMenu, ...props } = useContextMenu()
	return  (
		<Wrapper>
			<Item title='Top Left' />
			<Item title='Top Right' justify='right'/>
			<Item title='Top Right' justify='right'/>
			<Item title='Top Right' justify='right'/>
			<Item title='Top Right' justify='right'/>
			<Item title='Bottom Left' align='bottom' />
			<Item title='Bottom Right' align='bottom' justify='right' />
			<Item title='Bottom Right' align='bottom' justify='right' />
			<Item title='Bottom Right' align='bottom' justify='right' />
		</Wrapper>
	)
}

ToStorybook.story = {
  name: 'Simple Menu',
};
