import React
		 , { useMemo
		 	 , useState
		 	 , useLayoutEffect
		 	 , forwardRef
		 	 } from 'react'
import styled from 'styled-components'
import { useCombinedRefs, useResize, useThrottle } from '@biotic-ui/std'

export let Textarea = forwardRef((props = {}, userRef) => {
	let { maxHeight = null
		  , minRows = 1
		  , className = ''
		  , name = ''
		  , placeholder = ''
		  , value = ''
		  , style = {}
		  } = props

	let [input, setInput] = useState(null)
	let ref = useCombinedRefs(setInput, userRef)

	let { paddingBottom } = useMemo(() => {
		if (!input) return { paddingBottom: '0px' }
		return window.getComputedStyle(input)
	}, [input])

	function resize() {
		if (!input) return
		input.style.cssText = 'height:auto;'
		requestAnimationFrame(() => {
			let { scrollHeight, offsetHeight } = input
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
			name={name}
			className={className}
			placeholder={placeholder}
			onChange={props.onChange}
			onBlur={props.onBlur}
			value={props.value}
			rows={minRows}
			maxHeight={maxHeight}
		></StyledText>
	)
})


let StyledText = styled.textarea`
	--default-border: 1px solid rgba(34,36,38,.15);
	width: 100%;
	box-sizing: border-box;
	font-family: inherit;
	font-size: inherit;
	font-weight: inherit;
	border: var(--textarea-border, var(--default-border));
	background: var(--textarea-background, none);
	overflow-y: auto;
	padding: .38em 0.62em;
	border-radius: var(--input-border-radius, calc(var(--baseline) * 0.28571429));
	min-height: 33px;
	resize: none;
	line-height: 1.21428571em;
	max-height: ${p => p.maxHeight === null
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