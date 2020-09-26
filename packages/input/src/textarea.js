import React
		 , { useMemo
		 	 , useState
		 	 , useLayoutEffect
		 	 , forwardRef
		 	 } from 'react'
import styled from 'styled-components'
import { useCombinedRefs, useResize, useThrottle } from '@biotic-ui/std'
import { InputBase } from '@biotic-ui/leptons'

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
	${InputBase}
	
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