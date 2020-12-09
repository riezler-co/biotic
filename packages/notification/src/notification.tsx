import React from 'react'
import { createElement
			 , useRef
			 , useCallback
			 , useEffect
			 , cloneElement
			 , useState
			 , useLayoutEffect
			 , forwardRef
			 , MouseEvent
			 } from 'react'
import { createPortal } from 'react-dom'
import create from 'zustand'
import { useGetContainer } from '@biotic-ui/std'
import styled from 'styled-components'
import OutsideClickHandler from 'react-outside-click-handler'
import { motion, AnimatePresence } from 'framer-motion'

let getId: (() => number) = (() => {
	let currentId = 0
	return () => {
		let tmp = currentId
		currentId = currentId + 1
		return tmp
	}
})()

type NotificationElement = React.FC<{ onClose: (e: MouseEvent) => void }>

type Notification$ =
	{ id: number
	; Component: NotificationElement
	}

type State =
	{ notifications: Array<Notification$>
	; hover: Promise<any>
	; setHover: (p: Promise<any>) => void
	; open: (n: Notification$) => void
	; close: (id: number) => void
	; closeImmediate: (id: number) => void
	}

let useStore = create<State>((set, get) => ({
  notifications: [],
  hover: Promise.resolve(),
  setHover: (hover) => set({ hover }), 

  open: (notification: Notification$) => set(state => {

  	let index = state.notifications.findIndex(n => n.id === notification.id)
  	if (index > -1) {
  		return state
  	}

  	let notifications = [notification, ...state.notifications].slice(0, 3)
  	return { notifications }
  }),

  close: async (id: number) => {
  	await get().hover
  	return set(state => {
	  	let notifications = state.notifications.filter(x => x.id !== id)
	  	return { notifications }
	  })
  },

  closeImmediate: (id: number) => set(state => {
  	console.log({ id })
  	let notifications = state.notifications.filter(x => x.id !== id)
  	return { notifications }
  })

}))

export let useNotificationStore = useStore

function close(id: number) {
	let state = useStore.getState()
	state.close(id)
}

function closeImmediate(id: number) {
	let state = useStore.getState()
	state.closeImmediate(id)
}

function open(Component: NotificationElement) {
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

type Resolve = () => void

export function useNotification(Component: NotificationElement) {
	let id = useRef<number>(getId())
	let component = useRef<NotificationElement>(Component)
	let { open, close, closeImmediate } = useStore(state => state)

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

export let Notifications: React.FC<{}> = () => {

	let Container = useGetContainer('biotic-notifications')
	let { notifications, ...state } = useStore(state => state)
	let [hover, setHover] = useState(false)
	let [nodes, setNodex] = useState([])
	let resolver = useRef<Resolve>(() => {})

	function onMouseEnter() {
		setHover(true)
		let promise = new Promise((resolve) => {
			resolver.current = (resolve as Resolve)
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
				<AnimatePresence initial={false}>
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
				</AnimatePresence>
			</StyledNotifications>
		</OutsideClickHandler>
	)

	return Container ? createPortal(NotificationContainer, Container) : null
}

let StyledNotifications = styled.ul`
	position: fixed;
	bottom: var(--notification-bottom, var(--baseline));
	right: var(--notification-right, var(--baseline));
	display: flex;
	padding: 0;
	list-style-type: none;
	align-items: stretch;
	flex-direction: column-reverse;
	margin-bottom: 0;
`

let StyledNotification = styled(motion.li)<{ positionTransition: boolean }>`
	margin-top: var(--notification-spacing, calc(var(--baseline) * 0.38));
`

type ListItemProps =
	{ index: number
	; children: JSX.Element | Array<JSX.Element>
	; open: boolean
	; lastIndex: number
	}

let ListItem: React.FC<ListItemProps> = ({ index, children, open , lastIndex }) => {
	return (
		<StyledNotification
				initial={{ opacity: 0, transform: 'scale(0.62)' }}
				animate={{ opacity: 1, transform: 'scale(1)' }}
				exit={{ opacity: 0, transform: 'scale(0.62)' }}
				positionTransition
		>
			{ children }
		</StyledNotification>
	)
}

export let Notification = styled.div`
	--default-border: 1px solid #fff;
	background: var(--notification-background, #222);
	color: var(--notification-color, #fff);
	padding: var(--baseline) calc(var(--baseline) * 1.62);
	border: var(--notification-border, var(--default-border));
	border-radius: var(--baseline);
	width: 300px;
	display: flex;
	justify-content: space-between;
	padding-right: var(--baseline-half);
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

type CloseProps =
	{ onClick?: (e: MouseEvent) => void
	}

export function Close({ onClick }: CloseProps) {
	return (
		<Button onClick={onClick}>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
				<path d="M0 0h24v24H0z" fill="none"/>
			</svg>
		</Button>
	)
}