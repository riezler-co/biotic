import {
	cloneElement,
	ReactNode,
	Children,
	useState,
	ReactElement,
    HTMLAttributes,
    forwardRef,
} from 'react'

import { motion } from 'framer-motion'
import { css, cx } from '@emotion/css'

type PanelProps = HTMLAttributes<HTMLDivElement> & {
	side?: 'left' | 'right',
	width?: string | number,
	stacked?: boolean,
}

export let panel = css`
	--default-panel-shadow: rgba(74,74,74,0.2);
	padding: var(--size-5);
	top: 0;
	position: relative;
	height: 100%;
	background: #fff;
	display: inline-block;
	box-shadow: inset calc(var(--size-2) * 10) 0 calc(var(--size-2) * 12) 0 var(--panel-shadow, var(--default-panel-shadow))
			  , 0 0 calc(var(--size-2) * -3) var(--size-2) var(--panel-shadow, var(--default-panel-shadow));
	border-top-right-radius: var(--size-7);
	border-top-left-radius: 0;
	border-right: var(--border);
`

let panelRight = css`
	box-shadow: inset calc(var(--size-2) * -10) 0 calc(var(--size-2) * 12) 0 var(--panel-shadow, var(--default-panel-shadow))
			  , -8px 0 6px -12px rgba(0,0,0, 1);
	border-top-left-radius: var(--size-7);
	border-top-right-radius: 0;
	border-left: var(--border);

`

let panelStacked = css`
	&:not(:last-child) {
		margin-right: calc(var(--size-6) * -1);
		padding-right: calc(var(--size) * 6);
	}
`

export let Panel = forwardRef<HTMLDivElement, PanelProps>(({
	className = '',
	side = 'right',
	stacked = false,
	width = 'auto',
	style = {},
	...props
}, ref) => {
	let styles = {
		...style,
		width,
		[side]: '0'
	}

	return (
		<div
			ref={ref}
			{...props}
			style={styles}
			className={cx(
				panel,
				{ [panelRight]: side === 'right' },
				{ [panelStacked]: stacked },
				className,
			)}
		/>
	)
})

let modal = css`
	position: absolute;
	top: 0;
	height: 100%;
`

export let PanelModal = ({
	children,
	side = 'right',
	width,
	style,
	stacked,
	className = '',
	...props
}: PanelProps) => {
	return (
		<div
			{...props}
			className={cx(modal, className)}
			style={{ [side]: '0' }}
		>
			<Panel
				side={side}
				width={width}
				stacked={stacked}
			>
				{ children }
			</Panel>
		</div>
	)
}

let stack = css`
	position: relative;
	width: 100%;
	overflow: hidden;
`

let handler = css`
	opacity: 0;
	height: 100%;
	position: absolute;
	height: 100%;
	left: 0;
	margin: 0;
	padding: 0;
	border: none;
`

type StackedPanelProps = HTMLAttributes<HTMLDivElement> & {
	onActivate?: (ids: Array<string>) => void,
	children?: ReactNode,
}

export let StackedPanels = ({ children, onActivate, ...props }: StackedPanelProps) => {

	let [closed, setClosed] = useState(true)

	let _children = Children.map(children, (node, index) => {
		let elm = (node as ReactElement<PanelProps>)

		let variants = {
			closed: {
				transform: `translateX(0px)`,
				zIndex: index,
				top: 0,
			},

			open: {
				transform: `translateX(${40 * index * 4}px)`,
				zIndex: index,
				top: 0,
			}
		}

		let spring = {
			type: 'spring',
			damping: 21,
			stiffness: 130,
		}

		let onClick = () => {
			if (closed) {
				setClosed(false)
				return
			}

			let _children = Children.toArray(children) as Array<ReactElement<PanelProps>>
			let items = _children
				.filter(node => node.props?.id !== elm.props.id)
				.map(node => node.props?.id)

			let ids = items
				.concat([elm.props.id])
				.filter(Boolean)

			onActivate && onActivate((ids as Array<string>))
			setClosed(true)
		}

		let element = cloneElement(elm, {
			width: `calc(100% - var(--size-2) * ${index})`,
			stacked: true,
			style:{
				...props.style,
				position: 'absolute',
			},
		})

		return (
			<motion.div
				initial='closed'
				animate={closed ? 'closed' : 'open'}
				variants={variants}
				transition={spring}
				onClick={onClick}
				style={{ height: '100%', position: 'absolute', width: '100%' }}
			>
				{ element }	
			</motion.div>
		)
	})

	return (
		<div {...props} className={cx(stack, props.className)}>
			{ _children }
			<button
				className={handler}
				onClick={() => setClosed(!closed)}
				style={{
					width: `calc(var(--size) * ${_children?.length})`,
					zIndex: _children ? _children.length + 1 : 1
				}} />
		</div>
	)
}