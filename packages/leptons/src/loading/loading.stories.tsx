import { StoryFn, Meta } from '@storybook/react'

import '../../style/loading.css'
import { Pulse, Bounce, Flow, CircleFade } from '.'

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
} as Meta

export let PulseLoading: StoryFn = (args) => {
	return <Pulse {...args} />
}

PulseLoading.storyName = 'Pulse'

export let BounceLoading: StoryFn = (args) => {
	return <Bounce {...args} />
}

BounceLoading.storyName = 'Bounce'

export let FlowLoading: StoryFn = (args) => {
	return <Flow {...args} />
}

FlowLoading.storyName = 'Flow'

export let CircleFadeLoading: StoryFn = (args) => {
	return <CircleFade {...args} />
}

CircleFadeLoading.storyName = 'CircleFade'