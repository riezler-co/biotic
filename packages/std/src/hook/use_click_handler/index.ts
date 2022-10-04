import { MouseEvent, useRef, useCallback } from 'react'

type OnClick = (e: MouseEvent) => void

type Handlers = {
	onClick: OnClick;
	onDblClick: OnClick;
}

type Timeout = ReturnType<typeof setTimeout>
type Callback = (e: MouseEvent) => void;

/**
 * Returns a callback that that adds a delay before either
 * calling onClick or onDblClick
 * 
 * When the function is only called once within the delay,
 * onClick will be called
 * 
 * When the function is called multiple times within the
 * delay, onDblClick will be called
 *
 */
export function useClickHandler(
	{ onClick, onDblClick }: Handlers,
	delay: number = 250
): Callback {
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
