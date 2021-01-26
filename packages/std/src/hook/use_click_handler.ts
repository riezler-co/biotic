import { MouseEvent, useRef, useCallback } from 'react'

type OnClick = (e: MouseEvent) => void

type Handlers = {
	onClick: OnClick;
	onDblClick: OnClick;
}

type Timeout = ReturnType<typeof setTimeout>

export function useClickHandler({ onClick, onDblClick }: Handlers, delay: number = 250) {
    let timeoutID = useRef<null | Timeout>(null)

    let callback = useCallback(function (event: MouseEvent) {
        if (!timeoutID.current) {
            timeoutID.current = setTimeout(function () {
                onClick(event)
                timeoutID.current = null
            }, delay)
        } else {
            clearTimeout(timeoutID.current)
            timeoutID.current = null
            onDblClick(event)
        }
    },  [delay, onClick, onDblClick])

    return callback
}