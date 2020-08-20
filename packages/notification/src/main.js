
/*

	import { Notification, useNotification, notification } from '@biotic/notification'

	Root Element
	<Notification />


	Component
	let { open, close } = useNotification(({ onClose }) => {
		return (
			<Text>
				<button onClick={onClose}></button>
			</Text>
		)
	})


	outsite react
	let id = notification.open(({ onClose }) => {
		return (<div>...</div>)
	})

	notification.close(id)

*/

import React,
		 { createElement
		 , useRef
		 , useCallback
		 , useEffect
		 , cloneElement
		 , useState
		 , useLayoutEffect
		 } from 'react'
import { createPortal } from 'react-dom'
import create from 'zustand'
import { useGetContainer } from '@biotic-ui/std'
import styled from 'styled-components'
import { animated, useSpring } from 'react-spring'

let getId = (() => {
	let currentId = 0
	return () => {
		let tmp = currentId
		currentId = currentId + 1
		return tmp
	}
})()

let useStore = create(set => ({
  notifications: [],

  open: (notification) => set(state => {

  	let index = state.notifications.findIndex(n => n.id === notification.id)
  	if (index > -1) {
  		return state
  	}

  	let notifications = [notification, ...state.notifications].slice(0, 3)
  	return { notifications }
  }),

  close: (id) => set(state => {
  	let notifications = state.notifications.filter(x => x.id !== id)
  	return { notifications }
  })

}))

function close(id) {
	let state = useStore.getState()
	state.close(id)
}

function open(Component) {
	let id = getId()
	let state = useStore.getState()
	state.open({ id, Component })
	return id
}

export let notification = {
	open,
	close
}

export function useNotification(Component, props) {
	let id = useRef(getId())
	let component = useRef(null)
	let { open, close, setComponent } = useStore(state => state)

	let _open = useCallback(() => {
		open({ id: id.current , Component: component.current })
	}, [])

	let _close = useCallback(() => close(id.current), [])

	useEffect(() => {
		component.current = Component
	})

	return { open: _open, close: _close }
}

export function Notifications() {

	let Container = useGetContainer('biotic-notifications')
	let notifications = useStore(state => state.notifications)

	let NotificationContainer = (
		<StyledNotifications>
			{ 
				notifications.map(({ id, Component }, index) => {
					return (
						<ListItem key={id}>
							{ createElement(Component, { onClose: () => close(id) }) }
						</ListItem>
					)
				}) 
			}
		</StyledNotifications>
	)

	return Container ? createPortal(NotificationContainer, Container) : null
}

let StyledNotifications = styled.ul`
	position: fixed;
	bottom: 1em;
	right: 1em;
	display: flex;
	padding: 0;
	list-style-type: none;
	align-items: stretch;
	flex-direction: column-reverse;
`

let StyledNotification = styled.li`
	margin-bottom: 0.38em;
	border: 1px solid #fff;
`

function ListItem({ index, children, open }) {
	return (
		<StyledNotification>
			{ children }
		</StyledNotification>
	)
}

export let Notification = styled.div`
	background: var(--notification-background, #222);
	color: var(--notification-color, #fff);
	padding: 0.62em 1.38em;
	border-radius: 0.3em;
	width: 300px;
	display: flex;
	justify-content: space-between;
	padding-right: 0.62em;
`

let Button = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	display: flex;
	svg {
		fill: var(--notification-color, #fff);
		width: 1em;
		height: 1em;
	}
`

export function Close({ onClick }) {
	return (
		<Button onClick={onClick}>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
				<path d="M0 0h24v24H0z" fill="none"/>
			</svg>
		</Button>
	)
}