import React from 'react'
import { useState } from 'react'
import { Sortable
			 , useSortable
			 , reorder
			 , DragLayer
			 , Items
			 } from '@package/sortable/main'
import { motion } from 'framer-motion'
import styled from 'styled-components'

export default {
	title: 'Util/Sortable'
}

let ITEMS =
	[ { id: 1
		, text: 'One'
		}
	, { id: 2
		, text: 'Two' 
		}
	, { id: 3
		, text: 'Three' 
		}
	, { id: 4
		, text: 'Four' 
		}
	, { id: 5
		, text: 'Five' 
		}
	]

export let Default = () => {

	let [items, setItems] = useState(ITEMS)

	function handleChange(dragIndex, hoverIndex) {
		setItems(reorder(items, dragIndex, hoverIndex))
	}

	return (
		<Sortable onChange={handleChange} onDrop={(item) => console.log('item dropped', { item, items })}>
			<Items>
				{ 
					items.map((item, index) =>
						<DragableItem
									key={item.id}
									id={item.id}
									index={index}
						>
							{ item.text }
						</DragableItem>
					)
				}
			</Items>
			<DragLayer>
				{
					({ id, index }) => {
						let item = items.find(item => item.id === id)
						return (
							<StyledDragItem>
								<Item id={id}>
									{ item.text }
								</Item>
							</StyledDragItem>
						)
					} 
				}
			</DragLayer>
		</Sortable>
	)
}

Default.storyName = 'Default'

let StyledDragItem = styled.div`
	box-shadow: -2px 2px 6px -2px rgba(0,0,0, 0.5);
`

let StyledItem = styled.div`
	background: #eee;
	padding: 8px 16px;
	border-radius: 8px;
	p {
		margin-bottom: 0;
	}
`

function Item({ children }) {
	return (
		<StyledItem>
			<p>
				{ children }
			</p>
		</StyledItem>
	)
}


let StyledDragable = styled(motion.li)`
	margin-bottom: 16px;
`

function DragableItem({ id, index, children }) {
	let sort = useSortable({ id, index })
	return (
		<StyledDragable {...sort}>
			<Item>
				{ children }
			</Item>
		</StyledDragable>
	)
}