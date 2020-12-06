import React from 'react'
import { Button, LinkButton, OutlineButton } from '@package/button/main'

export default {
	title: 'Component/Button',
	component: Button,
}

export let Default = () => {
	return (
		<React.Fragment>
			<div>
				<p>Default</p>
				<Button>Default Button</Button>
			</div>
			<br />
			<div>
				<p>Loading</p>
				<Button loading>Default Button</Button>
			</div>
			<br />
			<div>
				<p>As Link</p>
				<Button as='a' href='#'>Link Button</Button>
			</div>
		</React.Fragment>
	)
}

Default.storyName = 'Default'

export let Link = () => {
	return (
		<React.Fragment>
			<div>
				<p>Default Button</p>
				<LinkButton>Default LinkButton</LinkButton>
			</div>
			<br />
			<div>
				<p>Loading</p>
				<LinkButton loading>Default LinkButton</LinkButton>
			</div>
			<br />
			<div>
				<p>As Link</p>
				<LinkButton as='a' href='#'>Default LinkButton</LinkButton>
			</div>
		</React.Fragment>
	)
}

Link.storyName = 'Link'

export let Outline = () => {
	return (
		<React.Fragment>
			<div>
				<p>Default</p>
				<OutlineButton>Default OutlineButton</OutlineButton>
			</div>
			<br />
			<div>
				<p>Loading</p>
				<OutlineButton loading>Default OutlineButton</OutlineButton>
			</div>
			<br />
			<div>
				<p>As Link</p>
				<OutlineButton as='a' href='#'>Default OutlineButton</OutlineButton>
			</div>
		</React.Fragment>
	)
}

Outline.storyName = 'Outline'