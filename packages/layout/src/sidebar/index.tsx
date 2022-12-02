import {
	Children,
	ReactElement,
	createContext,
	useContext,
	CSSProperties,
	ReactNode,
	HTMLAttributes,
	Fragment
} from 'react'
import { useMatchMedia } from '@biotic-ui/std'
import { Drawer, DrawerPosition } from '@biotic-ui/drawer'
import { motion, AnimateSharedLayout, MotionProps } from 'framer-motion'
import * as styles from './sidebar.styles'
import { scrollbar } from '@biotic-ui/leptons'

function layoutColumns(direction: DrawerPosition) {
	if (direction === DrawerPosition.Right) {
		return '1fr auto'
	}

	return 'auto 1fr'
}

type Props = {
	children?: ReactNode,
	direction?: DrawerPosition
}

let SidebarLayoutCtx = createContext({
	direction: DrawerPosition.Left
})

export function SidebarLayout({ children, direction = DrawerPosition.Left }: Props) {
	let _children = Children.toArray(children) as Array<ReactElement>
	let aside = _children.find(node => node.type === Aside) ?? null
	let main = _children.find(node => node.type === Main) ?? null

	let style = {
		'--_layout-columns': layoutColumns(direction)
	} as CSSProperties

	return (
		<SidebarLayoutCtx.Provider value={{ direction }}>
			<AnimateSharedLayout>
				<div
					className={styles.container}
					style={style}
				>
					{ (direction === DrawerPosition.Left) && aside }
					{ main }
					{ (direction === DrawerPosition.Right) && aside }
				</div>
			</AnimateSharedLayout>
		</SidebarLayoutCtx.Provider>
	)
}

type AsideProps = {
	children?: ReactNode;
	open: boolean;
	width?: number;
	drawer?: string;
	onClose: () => void;
}

export let Aside = (props: AsideProps) => {
	let ctx = useContext(SidebarLayoutCtx)

	let {
		children,
		open,
		width = 250,
		drawer = '',
		onClose = () => {}
	} = props
	
	let useDrawer = useMatchMedia(drawer)

	if (useDrawer) {
		return (
			<Fragment>
				
				{/*
					this way we don't need to update the grid-template-columns
					and the main area will get the full width
				*/}
				<div />

				<Drawer
					position={ctx.direction}
					open={open}
					maxWidth={width}
					onClose={() => onClose && onClose()}>
					{ children }
				</Drawer>
				
			</Fragment>
		)
	}

	let variants = {
		hidden: { width: 0 },
		visible: { width },	
	}

	let contentVariants = {
		hidden: {
			transform: ctx.direction === DrawerPosition.Right
				? `translateX(${width}px)`
				: `translateX(-${width}px)`
		},
		visible: {
			transform: 'translateX(0px)'
		}
	}

	let transition = {
		type: 'tween',
		ease: 'easeOut',
		duration: 0.5,
	}

	let contentStyle = {
		'--_aside-width': `${width}px`
	} as CSSProperties

	return (
		<motion.aside
			layout
			variants={variants}
			initial={open ? 'visible' : 'hidden'}
			animate={open ? 'visible' : 'hidden'}
			transition={transition} 
			className={styles.aside}
		>
		  <motion.div
		  	className={styles.content}
  			style={contentStyle}
  			variants={contentVariants}
			initial={open ? 'visible' : 'hidden'}
			animate={open ? 'visible' : 'hidden'}
			transition={transition} 
		  >
			{ children }
		  </motion.div>
		</motion.aside>
	)
}

export type MainProps = {
	children?: ReactNode
} & HTMLAttributes<HTMLDivElement> & MotionProps

export let Main = ({ children, className = '', ...props }: MainProps) => {

	let classes = [
		styles.main,
		scrollbar,
		className,
	].join(' ')

	return (
		<motion.main
			{...props}
			className={classes}
			layout
		>
			{ children }
		</motion.main>
	)
}