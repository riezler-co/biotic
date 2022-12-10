import { HTMLAttributes, MouseEvent } from 'react'

type TabProps
	= HTMLAttributes<HTMLElement>
	& {
		type: string
		id: string;
		isActive?: boolean;
		closable?: boolean;
		icon?: JSX.Element;
		onClick?: (e: MouseEvent) => void;
		onClose?: (e: MouseEvent) => void;
	}


export let Tab = ({
	children,
	isActive = false,
	closable = false,
	icon = <Close />,
	onClick,
	onClose,
	className = '',
	...props
}: TabProps) => {
	let wrapperClasses = [
		'biotic-tabs-tab-wrapper',
		isActive ? 'biotic-tabs-tab-wrapper--active' : '',
		className,
	].join(' ')

	return (
		<li
			{...props}
			className={wrapperClasses}
		>
			<button className={'biotic-tabs-tab'} onClick={onClick}>
				{ children }
			</button>
			{ 
				closable &&
				<button className='biotic-tabs-tab-close-button' onClick={onClose}>
					{ icon }
				</button>
			}
		</li>
	)
}

let Close = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
			<path d="M0 0h24v24H0z" fill="none"/>
		</svg>
	)
}