import {
	CSSProperties,
	useMemo,
	useState,
	useLayoutEffect,
	forwardRef,
	TextareaHTMLAttributes
} from 'react'

import { useCombinedRefs, useResize, useThrottle } from '@biotic-ui/std'
import { input as inputClass } from '@biotic-ui/leptons'
import { textareaClass } from '../styled'

type Ref = HTMLTextAreaElement

type TextareaProps = TextareaHTMLAttributes<Ref> & {
	maxHeight?: number | string,
	minRows?: number,
}

export let Textarea = forwardRef<Ref, TextareaProps>(({
		value,
		maxHeight = null,
		minRows = 1,
		className = '',
		style = {},
		...rest
	}, userRef) => {
	let [input, setInput] = useState<Ref | null>(null)
	let ref = useCombinedRefs<Ref>(setInput, userRef)

	let { paddingBottom } = useMemo(() => {
		if (!input) return { paddingBottom: '0px' }
		return window.getComputedStyle(input)
	}, [input])

	function resize() {
		if (input === null) return
		input.style.cssText = 'height:auto;'
		requestAnimationFrame(() => {
			if (input === null) {
				return
			}

			let { scrollHeight } = (input as HTMLTextAreaElement)
			input.style.cssText = ''
			input.style.height = `calc(${scrollHeight}px + ${paddingBottom})`
		})
	}

	useLayoutEffect(resize, [input, value])

	let throttledResize = useThrottle(resize, 200, [input])
	useResize(throttledResize)

	let styles = {
		...style,
		maxBlockSize: maxHeight === null
			? 'auto' 
			: typeof maxHeight === 'number'
			? `${maxHeight}px`
			: maxHeight,

		scrollbarWidth: maxHeight === null ? 'none' : 'thin',
		['--_scrollbar-width']: maxHeight === null ? '0' : 'var(--size-2)',
	} as CSSProperties

	return (
		<textarea
			style={styles}
			ref={ref}
			className={[inputClass, textareaClass, className].join(' ')}
			value={value}
			rows={minRows}
			{...rest}
		></textarea>
	)
})
