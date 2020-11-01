import React from 'react'
import { useMemo, useState, Children, createContext } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { AnimateSharedLayout } from 'framer-motion'
import { SortableCtx } from './ctx'

type Props =
	{ children: JSX.Element | Array<JSX.Element>
	; onChange: (drag: number, hover: number) => void 
	; onDrop?: (item: any) => void 
	}

export function Sortable({ children, onChange, onDrop }: Props) {

	let [item, setItem] = useState(null) 

	function moveItem(dragIndex: number, hoverIndex: number) {
		onChange(dragIndex, hoverIndex)
	}

	function dropItem(item: any) {
		onDrop && onDrop(item)
	}

	return (
		<DndProvider backend={HTML5Backend}>
			<SortableCtx.Provider value={{ moveItem, dropItem, item, setItem }}>
				{ children }
			</SortableCtx.Provider>
		</DndProvider>
	)
}

export function reorder(list: Array<any>, startIndex: number, endIndex: number): Array<any> {
	let result = Array.from(list)
	let [removed] = result.splice(startIndex, 1)
	result.splice(endIndex, 0, removed)

	return result
}

let styles = {
	listStyleType: 'none',
	margin: 0,
	padding: 0
}

type ItemProps =
	{ children: JSX.Element | Array<JSX.Element>
	}

export function Items({ children }: ItemProps) {
	return (
		<AnimateSharedLayout>
			<ul style={styles}>{ children }</ul>
		</AnimateSharedLayout>
	)
}