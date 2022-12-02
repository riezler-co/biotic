import { Fragment, useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { Button } from '@biotic-ui/button'

import {
	Notifications,
	useNotification,
	Notification,
	Close,
} from './main'

export default {
	title: 'Notification',
	component: Notifications
} as Meta

export let Default: StoryFn = () => {
	let [count, setCount] = useState(0)

	let first = useNotification(({ onClose }) => {
		return (
			<Notification role='status'>
				<span>First Notifications!!! { count }</span>
				<Close onClick={onClose}/>
			</Notification>
		)
	})

	let second = useNotification(({ onClose }) => {
		return <Notification>Second Notifications!!! fuuu barrr baz bla bla bla <Close onClick={onClose}/></Notification>
	})

	let third = useNotification(({ onClose }) => {
		return <Notification>fuuu barrr baz bla bla bla <Close onClick={onClose}/></Notification>
	})

	function openSecond() {
		second.open()
		setTimeout(() => {
			second.close()
		}, 3000)
	}

	return (
		<Fragment>
			<Button onClick={first.open}>Default Persistant</Button>
			<Button onClick={openSecond}>Auto Close</Button>
			<Button onClick={third.open}>One More</Button>

			<Button onClick={() => setCount(count + 1)}>Count: { count }</Button>
			<Notifications />
		</Fragment>
	)
}

Default.storyName = 'Default'