import {
	createElement,
	useRef,
	useCallback,
	useEffect,
	useState,
	MouseEvent,
	forwardRef,
	HTMLAttributes,
	ReactNode,
} from 'react'

import { createPortal } from 'react-dom'
import { useGetContainer, useOutsideClick } from '@biotic-ui/std'
import { css, cx } from '@emotion/css'
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

export let Notifications = (props: HTMLAttributes<HTMLUListElement>) => {

	let Container = useGetContainer('biotic-notifications')
	let [state, setStore] = useBoson(store)
	let [hover, setHover] = useState(false)
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
		<ul
			ref={ref}
			{ ...props }
			onMouseEnter={onMouseEnter}
			onClick={onMouseEnter}
			onMouseLeave={onMouseLeave}
			className={cx(notifications, props.className)}
		>
			<AnimatePresence initial={false}>
				{ 
					state.notifications.map(({ id, Component }, index) => {
						return (
							<ListItem
								key={id} 
								index={index}
								open={hover}
								lastIndex={state.notifications.length - 1}
							>
								{ createElement(Component, { onClose: () => setStore(closeImmediate(id)) }) }
							</ListItem>
						)
					}) 
				}
			</AnimatePresence>
		</ul>
	)

	return Container ? createPortal(NotificationContainer, Container) : null
}

let notifications = css`
	position: fixed;
	bottom: var(--notification-bottom, var(--size-2));
	right: var(--notification-right, var(--size-2));
	display: flex;
	padding: 0;
	list-style-type: none;
	align-items: stretch;
	flex-direction: column-reverse;
	margin-bottom: 0;
`

let listItem = css`
	margin-top: var(--notification-spacing, calc(var(--size-2) * 0.38));
`

type ListItemProps = {
	index: number;
	children: ReactNode;
	open: boolean;
	lastIndex: number
}

let ListItem = ({ children }: ListItemProps) => {
	return (
		<motion.li
			initial={{ opacity: 0, transform: 'scale(0.62)' }}
			animate={{ opacity: 1, transform: 'scale(1)' }}
			exit={{ opacity: 0, transform: 'scale(0.62)' }}
			className={listItem}
		>
			{ children }
		</motion.li>
	)
}

export let notification = css`
	--default-border: 1px solid #fff;
	background: var(--notification-background, #222);
	color: var(--notification-color, #fff);
	padding: var(--size-2) calc(var(--size-2) * 1.62);
	border: var(--notification-border, var(--default-border));
	border-radius: var(--size-2);
	width: 300px;
	display: flex;
	justify-content: space-between;
	padding-right: var(--size);
	max-width: 95vw;
`

export let Notification = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
	return <div
		ref={ref}
		{...props}
		className={cx(notification, props.className)}
	/>
})

let buttonClass = css`
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
		<button onClick={onClick} className={buttonClass}>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
				<path d="M0 0h24v24H0z" fill="none"/>
			</svg>
		</button>
	)
}