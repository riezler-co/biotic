import React from 'react'
import {
	useMemo,
	useState,
	useLayoutEffect,
	forwardRef,
	ChangeEvent,
	TextareaHTMLAttributes
} from 'react'
import styled from 'styled-components'
import { useCombinedRefs, useResize, useThrottle } from '@biotic-ui/std'
import { InputBase } from '@biotic-ui/leptons'

type Ref = HTMLTextAreaElement

type TextareaProps = {
	maxHeight?: number | string;
	minRows?: number;
	className?: string;
	name?: string;
	placeholder?: string;
	value?: string;
	style?: { [key:string]: any };
	onChange?: (e: ChangeEvent<Ref>) => void;
	onBlur?: (e: ChangeEvent<Ref>) => void;
}

export let Textarea = forwardRef<Ref, TextareaHTMLAttributes<Ref> & TextareaProps>((props, userRef) => {
	let {
		maxHeight = null,
		minRows = 1,
		className = '',
		style = {},
		...rest
	} = props

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

			let { scrollHeight, offsetHeight } = (input as HTMLTextAreaElement)
			input.style.cssText = ''
			input.style.height = `calc(${scrollHeight}px + ${paddingBottom})`
		})
	}

	useLayoutEffect(resize, [input, props.value])

	let throttledResize = useThrottle(resize, 200, [input])
	useResize(throttledResize)

	return (
		<StyledText
			style={style}
			ref={ref}
			className={className}
			onChange={props.onChange}
			onBlur={props.onBlur}
			value={props.value}
			rows={minRows}
			maxHeight={maxHeight}
			{...rest}
		></StyledText>
	)
})


let StyledText = styled.textarea<{ maxHeight: number | string | null }>`
	${InputBase}
	
	max-block-size: ${p => p.maxHeight === null
		? 'auto' 
		: typeof p.maxHeight === 'number'
				? `${p.maxHeight}px`
				: p.maxHeight  };

  	scrollbar-width: ${p => p.maxHeight === null ? 'none' : 'thin'};
  	scrollbar-color: var(--scrollbar, #cdcdcd);

	&::-webkit-scrollbar-track {
	    background-color: var(--scrollbar-bg, #f0f0f0);
	}

	&::-webkit-scrollbar {
	    width: ${p => p.maxHeight === null ? '0' : '7px'};
	    background-color: var(--scrollbar-bg, #f0f0f0);
	}

	&::-webkit-scrollbar-thumb {
	    background-color: var(--scrollbar, #cdcdcd);
	    border-radius: ${p => p.maxHeight === null ? '0' : '10px'};
	}
`