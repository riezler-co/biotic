import React from 'react'
import styled from 'styled-components'

let StyledText = styled.textarea`
	--default-border: 1px solid rgba(34,36,38,.15);
	width: 100%;
	font-family: inherit;
	font-size: inherit;
	font-weight: inherit;
	border: var(--textarea-border, var(--default-border));
	background: var(--textarea-background, none);
	overflow-y: auto;
	padding: .38em 0.62em;
	border-radius: var(--input-border-radius, .28571429rem);
	height: ${p => p.height}px;
	min-height: 33px;
	resize: none;
	line-height: 1.21428571em;

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
export let Textarea = (props = {}) => {
	let { maxHeight = null, minRows = 1 } = props
	let input = React.useRef(null)
	let [dirty, setDirty] = React.useState(false)
	let [height, setHeight] = React.useState(0)

	function resize() {
		if (input.current) {
			input.current.style.cssText = 'height:auto; padding:0'
			let { scrollHeight } = input.current
			if (maxHeight === null || scrollHeight < maxHeight) {
				setHeight(input.current.scrollHeight)
			}
			input.current.style.cssText = ''
		}
	}

	React.useLayoutEffect(resize, [input, props.value])

	function handleChange(event) {
		if (dirty) {
			props.onChange(event)
		}
	}

	function handleRef(ref) {
		input.current = ref
		if (props.focus && ref) {
			ref.focus()
		}
	}

	return (
		<StyledText
			ref={handleRef}
			name={props.name}
			className={props.className}
			placeholder={props.placeholder}
			onChange={handleChange}
			onKeyDown={() => setDirty(true)}
			onBlur={props.onBlur}
			value={props.value}
			height={height}
			rows={minRows}
			maxHeight={maxHeight}
		></StyledText>
	)
}
