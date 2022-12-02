import { css, cx } from '@emotion/css'
import { HTMLAttributes, MouseEvent } from 'react'
import { StyledTab } from './styled'

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
	...props
}: TabProps) => {
	return (
		<li
			{...props}
			className={cx(
				wrapper,
				{ [wrapperActive]: isActive },
			)}
		>
			<button className={StyledTab} onClick={onClick}>
				{ children }
			</button>
			{ 
				closable &&
				<button className={CloseButton} onClick={onClose}>
					{ icon }
				</button>
			}
		</li>
	)
}

export let CloseButton = css`
	border: none;
	background: none;
	cursor: pointer;
	:focus {
	  outline: none;
	}

	svg {
		--size: calc(var(--baseline) * 2);
		width: var(--size);
		height: var(--size);
	}

	:hover svg {
		background: rgba(200, 200, 200, 0.5);
	}
`

export let wrapper = css`
	list-style-type: none;
	background: var(--tab-background, grey);
	display: flex;
	align-items: center;
	border-left: 2px solid grey;

	:hover {
		background: var(--tab-background-hover, darkgrey);
	}
`

let wrapperActive = css`
	background: var(--tab-background--active, #fff);

	&:hover {
		background: var(--tab-background-hover--active, #fff);
	}
`

let Close = () => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
			<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
			<path d="M0 0h24v24H0z" fill="none"/>
		</svg>
	)
}