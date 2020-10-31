import React, { Suspense } from 'react'

import { Stepper
			 , Steps
			 , useProgress
			 , useData
			 , useInfo
			 , Progress
			 , Controls
			 } from '@package/stepper/main'

import { Button } from '@package/button/main'

export default {
	title: 'Component/Stepper',
	component: Stepper
}


let Step1 = () => {
	return <div>Step 1</div>
}

let Step2 = () => {
	return <div>Step 2</div>
}
let Step3 = () => {
	return <div>Step 3</div>
}

let CurrentProgress = ({ step, steps }) => {
	return (
		<progress max={steps - 1} value={step} />
	)
}

let Buttons = ({ onPrev, onNext }) => {
	return (
		<div>
			<Button disabled={onPrev === null} onClick={() => onPrev()}>Prev</Button>
			{ onNext && <Button onClick={() => onNext()}>Next</Button> }
			{ !onNext && <Button>Done</Button> }
		</div>
	)
}

export let Default = () => {
	return (
		<Stepper>
			<Progress>
				<CurrentProgress />
			</Progress>

			<Suspense fallback={<div>....loading</div>}>
				<Steps>
					<Step1 />
					<Step2 />
					<Step3 />
				</Steps>
			</Suspense>

			<Controls>
				<Buttons />
			</Controls>
		</Stepper>
	)
}

Default.storyName = 'Default Stepper'

let CurrentInfoProgress = ({ step, steps, infos }) => {
	let info = useInfo(step, infos)

	return (
		<header>
			<h1>{ info.title }</h1>
			<progress max={steps - 1} value={step} />
		</header>
	)
}


export let WithInfo = () => {
	return (
		<Stepper>
			<Progress>
				<CurrentInfoProgress />
			</Progress>

			<Steps>
				<Step1 info={{ title: 'One' }} />
				<Step2 info={{ title: 'Two' }} />
				<Step3 info={{ title: 'Three' }} />
			</Steps>


			<Controls>
				<Buttons />
			</Controls>
		</Stepper>
	)
}

WithInfo.storyName = 'With Info Stepper'

let Data1 = () => {
	let [data, setData] = useData({ counter: 0 })
	return (
		<div>
			<p>Counter: { data.counter }</p>
			<Button onClick={() => setData({ counter: data.counter + 1 })}>Up</Button>
		</div>
	)
}

let Data2 = () => {
	let [data, setData] = useData({ text: '' })
	return (
		<div>
			<p>Hello: { data.text }</p>
			<input value={data.text} onChange={e => setData({ text: e.target.value })} />
		</div>
	)
}

let Data3 = () => {
	let { data } = useProgress()

	return (
		<div>
			<p>Stepper State: </p>
			<pre>
				{ JSON.stringify(data, null, 2) }
			</pre>
		</div>
	)
}

export let WithData = () => {
	return (
		<Stepper fallback={<p>...loading</p>}>
			<Progress>
				<CurrentProgress />
			</Progress>

			<Suspense fallback={<div>...loading</div>}>
			<Steps>
				<Data1 />
				<Data2 />
				<Data3  />
			</Steps>
			</Suspense>

			<Controls>
				<Buttons />
			</Controls>
		</Stepper>
	)
}

WithData.storyName = 'State Stepper'

export let WithDataKey = () => {
	return (
		<Stepper fallback={<p>...loading</p>}>
			<Progress>
				<CurrentProgress />
			</Progress>

			<Steps>
				<Data1 key='one' />
				<Data2 key='two' />
				<Data3 key='three' />
			</Steps>

			<Controls>
				<Buttons />
			</Controls>
		</Stepper>
	)
}

WithDataKey.storyName = 'With Data Key'