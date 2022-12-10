import { Fragment, useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'

import {
	Pencil,
	Trash,
} from 'phosphor-react'

import '../style.css'
import {
	Collapsible,
	useAccordion,
	Accordion,
	AccordionItem,
	AccordionTitle,
	AccordionConent
} from './main'

import {
	Menu,
	MenuItem,
	Divider,
	MenuItemTitle,
} from '@biotic-ui/menu'

import { Button } from '@biotic-ui/button'

export default {
	title: 'Collapsible',
	component: Collapsible
} as Meta

export let Sheet: StoryFn = () => {
	let [open, setOpen] = useState(false)

	return (
		<Fragment>
			<Button onClick={() => setOpen(!open)}>Toggle Collapsible</Button>
			<Collapsible open={open}>
				<div>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum dolores, sit odio nesciunt enim earum quod iusto molestias, quos excepturi.
				</div>
			</Collapsible>
		</Fragment>
	)
}

Sheet.storyName = 'Simple Collapsible'

export let Dynamic: StoryFn = () => {
	let [children, setChildren] = useState([
		<li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum dolores, sit odio nesciunt enim earum quod iusto molestias, quos excepturi.</li>
	])

	let [open, setOpen] = useState(false)


	function addChild() {
		setChildren([
			...children,
			<li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum dolores, sit odio nesciunt enim earum quod iusto molestias, quos excepturi.</li>
		])
	}

	return (
		<Fragment>
			<Button onClick={addChild}>Add child</Button>
			<Button onClick={() => setOpen(!open)}>Toggle Collapsible</Button>
			<Collapsible open={open}>
				<ul>
					{ children }
				</ul>
			</Collapsible>
		</Fragment>
	)
}

Dynamic.storyName = 'Dynamic Content'

export let SimpleAcc: StoryFn = () => {
	let accordion = useAccordion()

	return (
		<Fragment>
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
						<ul>
							<li>dknwkdnkwndkw</li>
							<li>dknwkdnkwndkw</li>
							<li>dknwkdnkwndkw</li>
							<li>dknwkdnkwndkw</li>
							<li>dknwkdnkwndkw</li>
						</ul>
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
		</Fragment>
	)
}

SimpleAcc.storyName = 'Accordion'

export let MultiAcc: StoryFn = () => {
	let accordion = useAccordion({ multi: true })

	return (
		<Fragment>
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
		</Fragment>
	)
}

MultiAcc.storyName = 'Accordion with Multiple'

export let SheetMenu: StoryFn = () => {
	let [open, setOpen] = useState(false)

	return (
		<Fragment>
			<Button onClick={() => setOpen(!open)}>Toggle Collapsible</Button>
			<Collapsible open={open}>
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
			</Collapsible>
		</Fragment>
	)
}

SheetMenu.storyName = 'With Menu'