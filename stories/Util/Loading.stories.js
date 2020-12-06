import React, { useRef } from 'react'
import styled from 'styled-components'
import { Pulse, Bounce, Flow, CircleFade } from '@package/leptons/main'

export default {
	title: 'Util/Loading',
	argTypes: {
	  size: {
	  	defaultValue: 40,
	  	control: {
		  	type: 'number',
	  	}
	  },
	  color: {
	  	defaultValue: '#f0f',
	  	control: {
		  	type: 'color',
	  	}
	  },
	},
}

export let PulseLoading = (args) => {
	return <Pulse {...args} />
}

PulseLoading.storyName = 'Pulse'

export let BounceLoading = (args) => {
	return <Bounce {...args} />
}

BounceLoading.storyName = 'Bounce'

export let FlowLoading = (args) => {
	return <Flow {...args} />
}

FlowLoading.storyName = 'Flow'

export let CircleFadeLoading = (args) => {
	return <CircleFade {...args} />
}

CircleFadeLoading.storyName = 'CircleFade'