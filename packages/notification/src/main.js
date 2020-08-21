import React,
		 { createElement
		 , useRef
		 , useCallback
		 , useEffect
		 , cloneElement
		 , useState
		 , useLayoutEffect
		 , forwardRef
		 } from 'react'
import { createPortal } from 'react-dom'
import create from 'zustand'
import { useGetContainer } from '@biotic-ui/std'
import styled from 'styled-components'
import { animated, useSpring } from 'react-spring'
import OutsideClickHandler from 'react-outside-click-handler'

let getId = (() => {
	let currentId = 0
	return () => {
		let tmp = currentId
		currentId = currentId + 1
		return tmp
	}
})()

let useStore = create((set, get) => ({
  notifications: [],
  hover: Promise.resolve(),
  setHover: (hover) => set({ hover }), 

  open: (notification) => set(state => {

  	let index = state.notifications.findIndex(n => n.id === notification.id)
  	if (index > -1) {
  		return state
  	}

  	let notifications = [notification, ...state.notifications].slice(0, 3)
  	return { notifications }
  }),

  close: async (id) => {
  	await get().hover
  	return set(state => {
	  	let notifications = state.notifications.filter(x => x.id !== id)
	  	return { notifications }
	  })
  },

  closeImmediate: (id) => set(state => {
  	let notifications = state.notifications.filter(x => x.id !== id)
  	return { notifications }
  })

}))

export let useNotificationStore = useStore

function close(id) {
	let state = useStore.getState()
	state.close(id)
}

function closeImmediate(id) {
	let state = useStore.getState()
	state.closeImmediate(id)
}

function open(Component) {
	let id = getId()
	let state = useStore.getState()
	state.open({ id, Component })
	return id
}

export let notification = {
	open,
	close,
	closeImmediate
}

export function useNotification(Component, props) {
	let id = useRef(getId())
	let component = useRef(null)
	let { open, close, setComponent, closeImmediate } = useStore(state => state)

	let _open = useCallback(() => {
		open({ id: id.current , Component: component.current })
	}, [])

	let _close = useCallback(() => close(id.current), [])
	let _closeImmediate = useCallback(() => closeImmediate(id.current), [])

	useEffect(() => {
		component.current = Component
	})

	return { open: _open, close: _close, closeImmediate: _closeImmediate }
}

export function Notifications() {

	let Container = useGetContainer('biotic-notifications')
	let { notifications, ...state } = useStore(state => state)
	let [hover, setHover] = useState(false)
	let [nodes, setNodex] = useState([])
	let resolver = useRef(() => {})

	function onMouseEnter() {
		setHover(true)
		let promise = new Promise((resolve) => {
			resolver.current = resolve
		})

		state.setHover(promise)
	}

	function onMouseLeave() {
		setHover(false)
		resolver.current()
	}

	let NotificationContainer = (
		<OutsideClickHandler onOutsideClick={onMouseLeave}>
			<StyledNotifications onMouseEnter={onMouseEnter}
													 onClick={onMouseEnter}
											     onMouseLeave={onMouseLeave}>
				{ 
					notifications.map(({ id, Component }, index) => {
						return (
							<ListItem key={id} 
											  index={index}
											  open={hover}
											  lastIndex={notifications.length - 1}>
								{ createElement(Component, { onClose: () => state.closeImmediate(id) }) }
							</ListItem>
						)
					}) 
				}
			</StyledNotifications>
		</OutsideClickHandler>
	)

	return Container ? createPortal(NotificationContainer, Container) : null
}

let StyledNotifications = styled.ul`
	position: fixed;
	bottom: var(--notification-bottom, 1em);
	right: var(--notification-right, 1em);
	display: flex;
	padding: 0;
	list-style-type: none;
	align-items: stretch;
	flex-direction: column-reverse;
	margin-bottom: 0;
`

let StyledNotification = styled.li`
	margin-top: var(--notification-spacing, 0.38em);
	z-index: ${p => 3 - p.index};
	user-select: ${p => p.open ? 'auto' : 'none'};
`

let ListItem = forwardRef(({ index, children, open , lastIndex }, ref) => {

	let style = useSpring({
		transform: open ? `scale(1) translateY(0px)` : `scale(${1 - index * 0.08}) translateY(${index * 42}px)` 
	})

	return (
		<StyledNotification as={animated.div} style={style} ref={ref} index={index} open={open}>
			{ children }
		</StyledNotification>
	)
})

export let Notification = styled.div`
	--default-border: 1px solid #fff;
	background: var(--notification-background, #222);
	color: var(--notification-color, #fff);
	padding: 0.62em 1.38em;
	border: var(--notification-border, var(--default-border));
	border-radius: 0.3em;
	width: 300px;
	display: flex;
	justify-content: space-between;
	padding-right: 0.62em;
	max-width: 95vw;
`

let Button = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	display: flex;
	align-items: center;

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