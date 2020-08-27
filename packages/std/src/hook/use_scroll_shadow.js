import { useState, useCallback, useEffect } from 'react'
import { useDebounce } from './use_debounce'
import { useThrottle } from './use_throttle'
import { useResize } from './use_resize'
import { useResizeObserver } from './use_resize_observer'
import styled from 'styled-components'

let shadowColor = 'var(--scroll-shadow, var(--default-scroll-shadow))'

export let SHADOWS = {
	top: `${shadowColor} 0px 12px 8px -13px inset`,
	bottom: `${shadowColor} 0px -12px 8px -13px inset`,
	left: `${shadowColor} 12px 0 8px -13px inset`,
	right: `${shadowColor} -12px 0 8px -13px inset`,
}

let DefaultConfig = {
	top: true,
	bottom: true,
	left: true,
	right: true,
	shadows: SHADOWS,
}

let ShadowBox = styled.div`
	width: 0;
	height: 0;
	position: fixed;
	top: 0;
	left: 0;
	pointer-events: none;
	overflow: hidden;
`

export function useScrollShadow(ref, userConfig = {}) {

	let config = { ...DefaultConfig, ...userConfig }

	let [shadow, setShadow] = useState({
		top: false,
		bottom: false,
		left: false,
		right: false,
	})

	let [scrollBar, setScrollBar] = useState({ bottom: 0, right: 0 })

	let getShadow = useDebounce(
		() => {
			if (!ref.current) return

			let { scrollHeight
				  , scrollWidth
				  , scrollTop
				  , scrollLeft
				  , clientWidth
				  , clientHeight
				  } = ref.current

			setShadow({
				top: config.top ? scrollTop > 0 : false,
				bottom: config.bottom ? scrollHeight > (Math.ceil(scrollTop) + clientHeight + 5) : false,
				left: config.left ? scrollLeft > 0 : false,
				right: config.right ? scrollWidth > (Math.ceil(scrollLeft) + clientWidth + 5): false,
			})

		}, 500, [config, setShadow, ref], { leading: true, trailing: true }
	)

	useEffect(getShadow, [ref, setShadow])
	useEffect(() => getShadow.cancel, [getShadow])

	useEffect(() => {
		if (!ref.current) return

		let { clientWidth, offsetWidth, offsetHeight, clientHeight } = ref.current

		setScrollBar({
			bottom: offsetHeight - clientHeight, 
			right: offsetWidth - clientWidth, 
		})

	}, [ref, setScrollBar])

	let [boundingBox, setBoundingBox] = useState({
		top: 0,
		left: 0,
		width: 0,
		height: 0
	})

	let resizeRef = useResizeObserver(entries => {
		entries.forEach(entry => {
			if (entry.target) {
				let rect = entry.target.getBoundingClientRect()
				setBoundingBox(rect)
			}
		})
	})

	useEffect(() => {
		resizeRef(ref.current)
	}, [ref, resizeRef])

	let handleBoundingBox = useThrottle(() => {
		if (!ref.current) return
		let rect = ref.current.getBoundingClientRect()
		setBoundingBox(rect)
	}, 50, [ref])
	
	useResize(handleBoundingBox)

	let style = {
		'--default-scroll-shadow': 'rgba(0, 0, 0, 0.3)',
		'--shadow-offset-bottom': `${scrollBar.bottom}px`,
		'--shadow-offset-right': `${scrollBar.right}px`,
		top: `${boundingBox.top}px`,
		left: `${boundingBox.left}px`,
		width: `${boundingBox.width - scrollBar.right}px`,
		height: `${boundingBox.height - scrollBar.bottom}px`,
		boxShadow: getShadows(shadow, config.shadows)
	}

	return [getShadow, style, ShadowBox]
}

function getShadows(shadow, shadows) {
	return Object
		.entries(shadow)
		.filter(kv => kv[1] === true)
		.map(kv => shadows[kv[0]])
		.join(',')
}