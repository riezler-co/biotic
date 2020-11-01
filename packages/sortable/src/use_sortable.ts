import { useRef, useContext } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { SortableCtx } from './ctx'

type UseSortable =
	{ id: string
	; index: number
	}

export function useSortable({ id, index }: UseSortable) {
	let ctx = useContext(SortableCtx)

	let ref = useRef<null | HTMLElement>(null)

	// https://codesandbox.io/s/github/react-dnd/react-dnd/tree/gh-pages/examples_hooks_js/04-sortable/simple?from-embed=&file=/src/Card.jsx:321-329
	let [, drop] = useDrop<{ type: string, index: number, id: number}, any, any>({
	  accept: 'list-item',
	  hover(item, monitor) {
        if (ref.current === null) {
            return;
        }

        ctx.setItem(item)

        let dragIndex = item.index;
        let hoverIndex = index;
        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }
        // Determine rectangle on screen

        let hoverBoundingRect = ref.current?.getBoundingClientRect();
        

        // Get vertical middle
        let hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        // Determine mouse position
        let clientOffset = monitor.getClientOffset();

        if (clientOffset === null) {
        	return
        }

        // Get pixels to the top
        let hoverClientY = clientOffset.y - hoverBoundingRect.top;
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }
        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }
        // Time to actually perform the action
        ctx.moveItem(dragIndex, hoverIndex);
        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex;
    },
    drop(item, monitor) {
      if (!ref.current) {
        return
      }

      ctx.dropItem(item)
    }
	})

	let [{isDragging}, drag] = useDrag({
    item: { type: 'list-item', id, index },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  let style =
  	{ opacity: isDragging ? 0 : 1
  	, cursor: 'move'
  	}

  drag(drop(ref))

	return { ref, style, layout: true }
}