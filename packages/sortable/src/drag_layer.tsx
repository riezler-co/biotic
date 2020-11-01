import React, { CSSProperties } from 'react'
import { useContext } from 'react' 
import { useDragLayer } from 'react-dnd'
import { motion, useMotionValue } from 'framer-motion'
import { SortableCtx } from './ctx'

let layerStyles: CSSProperties = {
    position: 'fixed',
    pointerEvents: 'none',
    zIndex: 100,
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
}

type Props =
    { children: (props: any) => JSX.Element
    }

export let DragLayer = ({ children }: Props) => {
    let ctx = useContext(SortableCtx)
    let y = useMotionValue(0)
    let x = useMotionValue(0)

    let { itemType, isDragging, item, initialOffset, currentOffset, } = useDragLayer((monitor) => {
        let offset = monitor.getSourceClientOffset()

        if (offset) {
            y.set(offset.y)
            x.set(offset.x)
        }

        return ({
            item: monitor.getItem(),
            itemType: monitor.getItemType(),
            initialOffset: monitor.getInitialSourceClientOffset(),
            currentOffset: monitor.getSourceClientOffset(),
            isDragging: monitor.isDragging(),
        })
    })

    if (!isDragging) {
        return null
    }

    return (
        <div style={layerStyles}>
			<motion.div
                initial={{ transform: 'scale(1)' }}
                animate={{ transform: 'scale(1.05)' }}
                style={{ x, y }}
            >
				{ ctx.item && children(ctx.item) }
			</motion.div>
		</div>
    )
}
