import React from 'react';
import styled from 'styled-components'
import EditIcon from '../assets/edit_icon'
import DeleteIcon from '../assets/delete_icon'

import { Collapsible
			 , useAccordion
			 , Accordion
			 , AccordionItem
			 , AccordionTitle
			 , AccordionConent
			 } from '@package/collapsible/main'

import { Menu
			 , MenuItem
			 , Divider
			 , MenuItemTitle
			 , useMenu
			 } from '@package/menu/main'

export default {
	title: 'Component/Collapsible',
	component: Collapsible
}

export let Sheet = () => {
	let [open, setOpen] = React.useState(false)

	return (
		<React.Fragment>
			<button onClick={() => setOpen(!open)}>Toggle Collapsible</button>
			<Collapsible open={open}>
				<div>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum dolores, sit odio nesciunt enim earum quod iusto molestias, quos excepturi.
				</div>
			</Collapsible>
		</React.Fragment>
	)
}

Sheet.storyName = 'Simple Collapsible'

export let SimpleAcc = () => {
	let accordion = useAccordion()

	return (
		<React.Fragment>
			<Accordion {...accordion}>
				<AccordionItem>
					<AccordionTitle>First Item</AccordionTitle>
					<AccordionConent>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, eligendi.
					</AccordionConent>
				</AccordionItem>

				<AccordionItem>
					<AccordionTitle>First Item</AccordionTitle>
					<AccordionConent>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, eligendi.
					</AccordionConent>
				</AccordionItem>

				<AccordionItem>
					<AccordionTitle>First Item</AccordionTitle>
					<AccordionConent>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, eligendi.
					</AccordionConent>
				</AccordionItem>

				<AccordionItem>
					<AccordionTitle>First Item</AccordionTitle>
					<AccordionConent>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, eligendi.
					</AccordionConent>
				</AccordionItem>
			</Accordion>
		</React.Fragment>
	)
}

SimpleAcc.storyName = 'Accordion'

export let MultiAcc = () => {
	let accordion = useAccordion({ multi: true })

	return (
		<React.Fragment>
			<Accordion {...accordion}>
				<AccordionItem>
					<AccordionTitle>First Item</AccordionTitle>
					<AccordionConent>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, eligendi.
					</AccordionConent>
				</AccordionItem>

				<AccordionItem>
					<AccordionTitle>First Item</AccordionTitle>
					<AccordionConent>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, eligendi.
					</AccordionConent>
				</AccordionItem>

				<AccordionItem>
					<AccordionTitle>First Item</AccordionTitle>
					<AccordionConent>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, eligendi.
					</AccordionConent>
				</AccordionItem>

				<AccordionItem>
					<AccordionTitle>First Item</AccordionTitle>
					<AccordionConent>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas, eligendi.
					</AccordionConent>
				</AccordionItem>
			</Accordion>
		</React.Fragment>
	)
}

MultiAcc.storyName = 'Accordion with Multiple'

export let SheetMenu = () => {
	let [open, setOpen] = React.useState(false)

	return (
		<React.Fragment>
			<button onClick={() => setOpen(!open)}>Toggle Collapsible</button>
			<Collapsible open={open}>
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
			</Collapsible>
		</React.Fragment>
	)
}

SheetMenu.storyName = 'With Menu'