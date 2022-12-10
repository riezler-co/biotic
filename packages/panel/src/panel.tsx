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

type PanelProps = HTMLAttributes<HTMLDivElement> & {
	side?: 'left' | 'right',
	width?: string | number,
	stacked?: boolean,
}

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

	let classes = [
		'biotic-panel',
		side === 'right' ? 'biotic-panel--right' : '',
		stacked ? 'biotic-panel--stacked' : '',
		className,
	].join(' ')

	return (
		<div
			ref={ref}
			{...props}
			style={styles}
			className={classes}
		/>
	)
})

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
			className={['biotic-panel-modal', className].join(' ')}
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
		<div {...props} className={['biotic-panel-stack', props.className ?? ''].join(' ')}>
			{ _children }
			<button
				className='biotic-panel-stack-handler'
				onClick={() => setClosed(!closed)}
				style={{
					width: `calc(var(--size) * ${_children?.length})`,
					zIndex: _children ? _children.length + 1 : 1
				}} />
		</div>
	)
}