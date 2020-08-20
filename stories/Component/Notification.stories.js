import React from 'react'
import { Notifications, useNotification, notification, Notification, Close } from '@package/notification/main'

export default {
	title: 'Component/Notification',
	component: Notifications
}

export let Default = () => {

	let [count, setCount] = React.useState(0)

	let first = useNotification(({ onClose }) => {
		return (
			<Notification>
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
				return <Notification>Third Notifications!!! <Close onClick={onClose}/></Notification>
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
			<button onClick={first.open}>First</button>
			<button onClick={openSecond}>Second</button>
			<button onClick={third.open}>One More</button>

			<button onClick={() => setCount(count + 1)}>Count: { count }</button>
			<Notifications />
		</React.Fragment>
	)
}

Default.storyName = 'Default'