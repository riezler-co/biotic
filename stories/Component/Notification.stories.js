import React from 'react'
import { Notifications, useNotification, notification, Notification, Close } from '@package/notification/main'
import { Button } from '@package/button/main'

export default {
	title: 'Component/Notification',
	component: Notifications
}

export let Default = () => {

	let [count, setCount] = React.useState(0)

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

	React.useEffect(() => {
		setTimeout(() => {

			let id = notification.open(({ onClose }) => {
				return <Notification>Open programmatically <Close onClick={onClose}/></Notification>
			})

		}, 2000)
	}, [])


	function openSecond() {
		second.open()
		setTimeout(() => {
			second.close()
		}, 3000)
	}

	return (
		<React.Fragment>
			<Button onClick={first.open}>Default Persistant</Button>
			<Button onClick={openSecond}>Auto Close</Button>
			<Button onClick={third.open}>One More</Button>

			<Button onClick={() => setCount(count + 1)}>Count: { count }</Button>
			<Notifications />
		</React.Fragment>
	)
}

Default.storyName = 'Default'