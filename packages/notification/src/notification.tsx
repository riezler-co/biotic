import React from 'react'
import {
	createElement,
	useRef,
	useCallback,
	useEffect,
	cloneElement,
	useState,
	useLayoutEffect,
	forwardRef,
	MouseEvent,
} from 'react'
import { createPortal } from 'react-dom'
import { useGetContainer, useOutsideClick } from '@biotic-ui/std'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { boson, useBoson, useSetBoson, SetterOrUpdater } from '@biotic-ui/boson'

let getId: (() => number) = (() => {
	let currentId = 0
	return () => {
		let tmp = currentId
		currentId = currentId + 1
		return tmp
	}
})()

type NotificationElement = React.FC<{ onClose: (e: MouseEvent) => void }>

type Notification$ = {
	id: number;
	Component: NotificationElement;
}

type Store = {
	notifications: Array<Notification$>;
	hover: Promise<any>;
}

let store = boson<Store>({
	key: 'notifications',
	defaultValue: {
		notifications: [],
		hover: Promise.resolve(),
	}
})

export let open = (notification: Notification$) => (store: Store): Store => {
	let index = store.notifications.findIndex(n => n.id === notification.id)
	if (index > -1) {
		return store
	}

	let notifications = [notification, ...store.notifications].slice(0, 3)
	return { ...store, notifications }
}

export let close = (id: number) => async (store: Store): Promise<Store> => {
	await store.hover
	let notifications = store.notifications.filter(x => x.id !== id)
	return { ...store, notifications }
}

export let closeImmediate = (id: number) => (store: Store): Store => {
	let notifications = store.notifications.filter(x => x.id !== id)
	return { ...store, notifications }
}

let setStoreHover = (hover: Promise<any>) => (store: Store): Store => {
	return { ...store, hover }
}

export function useNotificationStore(): [Store, ((nextState: SetterOrUpdater<Store>) => void)] {
	return useBoson(store)
}

type Resolve = () => void

export function useNotification(Component: NotificationElement) {
	let id = useRef<number>(getId())
	let component = useRef<NotificationElement>(Component)
	let setState = useSetBoson(store)

	let _open = useCallback(() => {
		let notification = { id: id.current , Component: component.current } 
		setState(open(notification))
	}, [setState])

	let _close = useCallback(() => setState(close(id.current)), [setState])
	let _closeImmediate = useCallback(() => setState(closeImmediate(id.current)), [setState])

	useEffect(() => {
		component.current = Component
	})

	return { open: _open, close: _close, closeImmediate: _closeImmediate }
}

export let Notifications: React.FC<{}> = () => {

	let Container = useGetContainer('biotic-notifications')
	let [state, setStore] = useBoson(store)
	let [hover, setHover] = useState(false)
	let [nodes, setNodex] = useState([])
	let resolver = useRef<Resolve>(() => {})

	function onMouseEnter() {
		setHover(true)
		let promise = new Promise((resolve) => {
			resolver.current = (resolve as Resolve)
		})

		setStore(setStoreHover(promise))
	}

	function onMouseLeave() {
		setHover(false)
		resolver.current()
	}

	let ref = useOutsideClick<HTMLUListElement>(onMouseLeave)

	let NotificationContainer = (
		<StyledNotifications
						ref={ref}
						onMouseEnter={onMouseEnter}
						onClick={onMouseEnter}
						onMouseLeave={onMouseLeave}>
			<AnimatePresence initial={false}>
				{ 
					state.notifications.map(({ id, Component }, index) => {
						return (
							<ListItem key={id} 
											  index={index}
											  open={hover}
											  lastIndex={state.notifications.length - 1}>
								{ createElement(Component, { onClose: () => setStore(closeImmediate(id)) }) }
							</ListItem>
						)
					}) 
				}
			</AnimatePresence>
		</StyledNotifications>
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

type ListItemProps = {
	index: number;
	children: JSX.Element | Array<JSX.Element>;
	open: boolean;
	lastIndex: number
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

type CloseProps = {
	onClick?: (e: MouseEvent) => void;
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