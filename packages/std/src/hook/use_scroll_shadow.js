import { useLayoutEffect, useState, useCallback, useEffect } from 'react'
import _ from 'lodash'

let shadowColor = 'var(--scroll-shadow, var(--default-scroll-shadow))'

export let SHADOWS = {
	top: `${shadowColor} 0px 12px 8px -13px inset`,
	bottom: `${shadowColor} 0px calc(-12px - var(--shadow-offset-bottom)) 8px -13px inset`,
	left: `${shadowColor} 12px 0 8px -13px inset`,
	right: `${shadowColor} calc(-12px - var(--shadow-offset-right)) 0 8px -13px inset`,
}

let DefaultConfig = {
	top: true,
	bottom: true,
	left: true,
	right: true,
	shadows: SHADOWS
}

export function useScrollShadow(ref, userConfig = {}) {

	let config = { ...DefaultConfig, ...userConfig }

	let [shadow, setShadow] = useState({
		top: false,
		bottom: false,
		left: false,
		right: false,
	})

	let [scrollBar, setScrollBar] = useState({ bottom: 0, right: 0 })

	let getShadow = useCallback(
		_.debounce(() => {
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
				bottom: config.bottom ? scrollHeight > (scrollTop + clientHeight) : false,
				left: config.left ? scrollLeft > 0 : false,
				right: config.right ? scrollWidth > (scrollLeft + clientWidth) : false,
			})

		}, 500, { leading: true, trailing: true })
		, [config, setShadow, ref]
	)

	useLayoutEffect(getShadow, [ref, setShadow])
	
	useEffect(() => getShadow.cancel, [getShadow])

	useLayoutEffect(() => {
		if (!ref.current) return

		let { clientWidth, offsetWidth, offsetHeight, clientHeight } = ref.current

		setScrollBar({
			bottom: offsetHeight - clientHeight, 
			right: offsetWidth - clientWidth, 
		})

	}, [ref, setScrollBar])

	let style = {
		'--default-scroll-shadow': 'rgba(0, 0, 0, 0.3)',
		'--shadow-offset-bottom': `${scrollBar.bottom}px`,
		'--shadow-offset-right': `${scrollBar.right}px`,
		boxShadow: getShadows(shadow, config.shadows)
	}

	return [getShadow, style, shadow]
}

function getShadows(shadow, shadows) {
	return Object
		.entries(shadow)
		.filter(kv => kv[1] === true)
		.map(kv => shadows[kv[0]])
		.join(',')
}