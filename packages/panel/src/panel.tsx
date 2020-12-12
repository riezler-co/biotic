import React, { Children, useState } from 'react'

import styled, { css } from 'styled-components'

type PanelProps = {
	side?: 'left' | 'right';
	width?: string | number;
	stacked?: boolean;
}

export let Panel = styled.div<PanelProps>`
	--default-panel-shadow: rgba(74,74,74,0.2);
	padding: var(--baseline-3);
	top: 0;
	position: relative;
	height: 100%;
	background: #fff;
	display: inline-block;

	width: ${p => typeof p.width === 'string'
		? p.width
		: typeof p.width === 'number'
		? `${p.width}px`
		: 'auto'
	};
	
	${p => p.side === 'left'
		? `
			box-shadow: inset calc(var(--baseline) * 10) 0 calc(var(--baseline) * 12) 0 var(--panel-shadow, var(--default-panel-shadow))
					  , 0 0 calc(var(--baseline) * -3) var(--baseline) var(--panel-shadow, var(--default-panel-shadow))
		`
		: `
			box-shadow: inset calc(var(--baseline) * -10) 0 calc(var(--baseline) * 12) 0 var(--panel-shadow,var(--default-panel-shadow))
					  , -8px 0 6px -12px rgba(0,0,0, 1);
		`
	};
	${p => p.side === 'left'
		? 'border-top-right-radius: var(--baseline-5)'
		: 'border-top-left-radius: var(--baseline-5)'
	};
	${p => p.side === 'left'
		? 'border-right: var(--border)'
		: 'border-left: var(--border)'
	};

	${p => p.side === 'left'
		? 'left: 0'
		: 'right: 0'
	};

	${p => !p.stacked &&
		`
			:not(:last-child) {
				margin-right: calc(var(--baseline-4) * -1);
				padding-right: calc(var(--baseline) * 6);
			}
		`
	}
`

let StyledModal = styled.div<{ side: 'left' | 'right' }>`
	position: absolute;
	${p => p.side === 'left' ? 'left: 0' : 'right: 0'};
	top: 0;
	height: 100%;
`

export let PanelModal: React.FC<PanelProps> = ({
	children,
	side = 'right',
	width = 'auto',
	...props
}) => {
	return (
		<StyledModal side={side} {...props}>
			<Panel side={side} width={width}>
				{ children }
			</Panel>
		</StyledModal>
	)
}

let Stack = styled.div`
	position: relative;
	width: 100%;
	overflow: hidden;
`

let Handler = styled.button`
	opacity: 0;
	height: 100%;
	position: absolute;
	height: 100%;
	left: 0;
	margin: 0;
	padding: 0;
	border: none;
`

type StackedPanelProps = {
	onActivate?: (ids: Array<string>) => void;
}

export let StackedPanels: React.FC<StackedPanelProps> = ({ children, onActivate, ...props }) => {

	let [closed, setClosed] = useState(true)

	let _children = Children.map(children, (node, index) => {
		let elm = (node as  React.ReactElement<PanelProps>)
		return React.cloneElement(elm, {
			width: `calc(100% - var(--baseline) * ${index})`,
			style: {
				zIndex: index,
				top: 0,
				position: 'absolute',
				right: closed ? 0 : `calc(var(--baseline-5) * ${index * 4} * -1)`
			},
			stacked: true,
			onClick: () => {
				if (closed) {
					return
				}

				let _children = Children.toArray(children)
				let items = children
					.filter(node => node.props.id !== elm.props.id)
					.map(node => node.props.id)

				let ids = items.concat([elm.props.id])

				onActivate && onActivate(ids)
				setClosed(true)
			}
		})
	})

	return (
		<Stack {...props}>
			{ _children }
			<Handler
				onClick={() => setClosed(!closed)}
				style={{
					width: `calc(var(--baseline) * ${children.length})`,
					zIndex: children.length + 1
				}} />
		</Stack>
	)
}