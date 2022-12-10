import { FormEvent, useState } from 'react'
import { Meta, StoryFn } from '@storybook/react'
import styled from 'styled-components'
import {
	SidebarLayout,
	Aside,
	Main,
} from '@biotic-ui/layout'

import { useForm } from '@biotic-ui/std'

import '../style.css'
import {
	Tabs,
	TabBar,
	TabContent,
	Tab,
	useTabs,
	useTabHistory,
	TabPanel,
	useTabState,
	useDefaultTab,
	useScrollState,
	useRestoreScroll,
	useOnTabClose,
	useGroup,
	usePanelId,
} from './main'

import { Button } from '@biotic-ui/button'


export default {
	title: 'Layout/Tabs',
	component: Tabs,
} as Meta

export let Default: StoryFn = () => {
	let [, setOpen] = useState(true)
	let tabs = useTabs()
	let openTab = useTabHistory()
	
	useDefaultTab({
		index: 0,
		type: 'dummy',
		id: 'one',
	})

	let push = () => {
		let fuu = Math.random().toString()
		openTab.push({
			id: fuu,
			title: fuu,
			type: 'random',
		})
	}

	let openStatic = (id: string) => () => {
		openTab.push({
			id,
			title: 'static',
			type: 'static',
		})
	}

	return (
		<SidebarLayout>
			<Aside open={true} drawer='(max-width: 900px)' onClose={() => setOpen(false)}>
				<Button onClick={push}>Open Random</Button>
				<Button onClick={openStatic('four')}>Open Static</Button>
			</Aside>
			<Main>
				<Tabs>
					<TabBar>
						<Tab type='dummy' id='one'>One</Tab>
						<Tab type='fuuu' id='two'>Two</Tab>
						<Tab type='baar' id='three'>Three</Tab>
						{
							tabs.items.map(tab => 
								<Tab key={tab.id} {...tab}>
									{tab.title}
								</Tab>
							)
						}
					</TabBar>
					<TabContent fallback={<div>Open Tab</div>}>
						<TabPanel type='dummy'>
							<Content>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam temporibus accusantium officia vel, ipsum. Voluptatibus, optio illo numquam eum itaque explicabo magni, iusto error, eos labore hic obcaecati repudiandae earum laboriosam, quidem deleniti. Soluta, amet. Assumenda quod, officia magni molestias, asperiores error odio. Ea ipsam iusto mollitia illum velit illo sequi, hic maxime recusandae provident architecto unde officiis incidunt. Ducimus recusandae temporibus enim nisi, architecto deleniti excepturi eligendi molestias harum? Magnam sint, est odit sed suscipit voluptatum eligendi modi illum aperiam accusamus numquam. Cupiditate, veniam iste culpa quas doloremque aliquam quisquam alias eius eligendi aut corrupti earum illum esse magnam molestiae voluptate minus, blanditiis tenetur officia perferendis voluptas repellendus autem sunt aspernatur perspiciatis. Sint, consequatur. Neque officiis modi aliquid, facere architecto exercitationem alias tempora sed dolore vero incidunt nostrum assumenda porro eius deleniti temporibus id voluptatum optio. Sint hic excepturi iusto nisi dolor corrupti inventore dignissimos dicta delectus, molestias nulla est tempora, quia optio dolorum! Doloremque, animi. Laudantium saepe, recusandae illum sequi, omnis maiores mollitia autem velit est a assumenda. Quas corporis quo eius dicta, doloribus tempore ipsum. Voluptates eligendi excepturi, voluptatem reiciendis doloribus porro omnis distinctio placeat harum repellat suscipit soluta et fugiat iusto commodi, adipisci, autem nesciunt nostrum ipsa quaerat sapiente qui laboriosam, ea. Tempora libero autem ex dolore dicta assumenda excepturi quibusdam magnam voluptates ipsum, quasi aspernatur veniam aut. Eos quae numquam maxime dolorem veritatis error enim et quaerat amet ullam non quos omnis est nulla quis minus sunt eveniet, assumenda totam praesentium. Illo commodi beatae iste dolore voluptatibus voluptate quidem, omnis voluptatum a, doloribus ullam optio perspiciatis minima nesciunt, dolor, eos corrupti magni repudiandae amet facilis expedita adipisci. Modi rem, ducimus ex sapiente saepe odio, consequatur quis quasi voluptate voluptatem voluptas, cum tempore iure, eligendi nisi eveniet hic itaque vel? Nulla temporibus repudiandae sit sapiente, debitis.
							</Content>
						</TabPanel>

						<TabPanel type='random'>
							<Random />
						</TabPanel>

						<TabPanel type='fuuu'>
							<Content>
								<h1>FUUUU</h1>
							</Content>
						</TabPanel>

						<TabPanel type='baar'>
							<Content>
								<h1>Bar</h1>
							</Content>
						</TabPanel>

						<TabPanel type='static'>
							<StaticId />
						</TabPanel>

					</TabContent>
				</Tabs>
			</Main>
		</SidebarLayout>
	)
}

let Random = () => {
	let id = usePanelId()
	let [state, setState] = useTabState(id, {
		count: 0
	})

	let nestedId = `nested:${id}`
	let [, setScroll, cleanNested] = useScrollState(nestedId)
	let nested = useRestoreScroll(nestedId)

	function handleUp() {
		setState({ count: state.count + 1 })
	}

	useOnTabClose(id, cleanNested)

	return (
		<Content>
			<h1>{ id }</h1>
			<h2>{ state.count }</h2>
			<Button onClick={handleUp}>Up</Button>

			<Nested id={nestedId} onScroll={setScroll} ref={nested}>
				<Box />
			</Nested>
		</Content>)
}

let Nested = styled.div`
	overflow: auto;
	width: 400px;
	height: 400px;
`

let Box = styled.div`
	width: 1000px;
	height: 1000px;
	background: #ff00ff33;
`

let StaticId = () => {
	let id = usePanelId()
	let group = useGroup()
	let _id = `${group}::${id}`

	let [state, setState] = useTabState(_id, {
		count: 0
	})

	let nestedId = `nested:${_id}`
	let [, setScroll, cleanNested] = useScrollState(nestedId)
	let nested = useRestoreScroll(nestedId)

	function handleUp() {
		setState({ count: state.count + 1 })
	}

	useOnTabClose(id, cleanNested)

	return (
		<Content>
			<h1>ID: { _id }</h1>
			<h2>{ state.count }</h2>
			<Button onClick={handleUp}>Up</Button>

			<Nested id={nestedId} onScroll={setScroll} ref={nested}>
				<Box />
			</Nested>
		</Content>)
}

Default.storyName = 'Default'


let Content = styled.div`
	width: 600px;
	height: 150vh;
	background: blue;
	margin: 0 auto;
`

export let NestedTabs: StoryFn = () => {
	let group = 'outer'
	let tabs = useTabs(group)
	let openTab = useTabHistory(group)
	
	useDefaultTab({
		index: 0,
		type: 'overview',
		id: 'one'
	}, group)

	let push = () => {
		let fuu = Math.random()
		openTab.push({
			id: fuu.toString(),
			title: fuu.toString(),
			type: 'random'
		})
	}

	let openStatic = (id: string) => () => {
		openTab.push({
			id,
			title: Math.random().toString(),
			type: 'static'
		})
	}

	return (
		<Tabs group={group}>
			<TabBar>
				<Tab type='overview' id='one'>Overview</Tab>

				{
					tabs.items.map(tab => 
						<Tab key={tab.id} {...tab}>
							{tab.title}
						</Tab>
					)
				}
			</TabBar>
			<TabContent fallback={<div>Open Tab</div>}>
				<TabPanel type='overview'>
					<NestedOverview />
				</TabPanel>

				<TabPanel type='nested'>
					<NestedContent />
				</TabPanel>

			</TabContent>
		</Tabs>
	)
} 

NestedTabs.storyName = 'Nested'


function NestedOverview() {
	let openTab = useTabHistory('outer')
	let [form, setForm, set] = useForm({ title: '' })

	function handleSubmit(e: FormEvent) {
		e.preventDefault()
		let id = Math.random().toString()
		openTab.push({
			id,
			title: form.title,
			type: 'nested'
		})

		set({ title: '' })
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input name='title'
							 onChange={setForm}
							 value={form.title}
				/>
				<button>Open</button>
			</form>
		</div>
	)
}

function NestedContent() {
	let id = usePanelId()
	let [, setOpen] = useState(true)
	let group = `nested:${id}`
	let tabs = useTabs(group)
	let openTab = useTabHistory(group)
	
	useDefaultTab({
		index: 0,
		type: 'dummy',
		id: 'one'
	}, group)

	let push = () => {
		let fuu = Math.random().toString()
		openTab.push({
			id: fuu,
			title: fuu,
			type: 'random'
		})
	}

	let openStatic = (id: string) => () => {
		openTab.push({
			id,
			title: Math.random().toString(),
			type: 'static'
		})
	}

	return (
		<SidebarLayout>
			<Aside open={true} drawer='(max-width: 900px)' onClose={() => setOpen(false)}>
				<Button onClick={push}>Open Random</Button>
				<Button onClick={openStatic('four')}>Open Four</Button>
			</Aside>
			<Main>
				<Tabs group={group}>
					<TabBar>
						<Tab type='dummy' id='one'>One</Tab>
						<Tab type='fuuu' id='two'>Two</Tab>
						<Tab type='baar' id='three'>Three</Tab>
						{
							tabs.items.map(tab => 
								<Tab key={tab.id} {...tab}>
									{tab.title}
								</Tab>
							)
						}
					</TabBar>
					<TabContent fallback={<div>Open Tab</div>}>
						<TabPanel type='dummy'>
							<Content>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam temporibus accusantium officia vel, ipsum. Voluptatibus, optio illo numquam eum itaque explicabo magni, iusto error, eos labore hic obcaecati repudiandae earum laboriosam, quidem deleniti. Soluta, amet. Assumenda quod, officia magni molestias, asperiores error odio. Ea ipsam iusto mollitia illum velit illo sequi, hic maxime recusandae provident architecto unde officiis incidunt. Ducimus recusandae temporibus enim nisi, architecto deleniti excepturi eligendi molestias harum? Magnam sint, est odit sed suscipit voluptatum eligendi modi illum aperiam accusamus numquam. Cupiditate, veniam iste culpa quas doloremque aliquam quisquam alias eius eligendi aut corrupti earum illum esse magnam molestiae voluptate minus, blanditiis tenetur officia perferendis voluptas repellendus autem sunt aspernatur perspiciatis. Sint, consequatur. Neque officiis modi aliquid, facere architecto exercitationem alias tempora sed dolore vero incidunt nostrum assumenda porro eius deleniti temporibus id voluptatum optio. Sint hic excepturi iusto nisi dolor corrupti inventore dignissimos dicta delectus, molestias nulla est tempora, quia optio dolorum! Doloremque, animi. Laudantium saepe, recusandae illum sequi, omnis maiores mollitia autem velit est a assumenda. Quas corporis quo eius dicta, doloribus tempore ipsum. Voluptates eligendi excepturi, voluptatem reiciendis doloribus porro omnis distinctio placeat harum repellat suscipit soluta et fugiat iusto commodi, adipisci, autem nesciunt nostrum ipsa quaerat sapiente qui laboriosam, ea. Tempora libero autem ex dolore dicta assumenda excepturi quibusdam magnam voluptates ipsum, quasi aspernatur veniam aut. Eos quae numquam maxime dolorem veritatis error enim et quaerat amet ullam non quos omnis est nulla quis minus sunt eveniet, assumenda totam praesentium. Illo commodi beatae iste dolore voluptatibus voluptate quidem, omnis voluptatum a, doloribus ullam optio perspiciatis minima nesciunt, dolor, eos corrupti magni repudiandae amet facilis expedita adipisci. Modi rem, ducimus ex sapiente saepe odio, consequatur quis quasi voluptate voluptatem voluptas, cum tempore iure, eligendi nisi eveniet hic itaque vel? Nulla temporibus repudiandae sit sapiente, debitis.
							</Content>
						</TabPanel>

						<TabPanel type='random'>
							<Random />
						</TabPanel>

						<TabPanel type='fuuu'>
							<Content>
								<h1>FUUUU</h1>
							</Content>
						</TabPanel>

						<TabPanel type='baar'>
							<Content>
								<h1>Bar</h1>
							</Content>
						</TabPanel>

						<TabPanel type='static'>
							<StaticId />
						</TabPanel>

					</TabContent>
				</Tabs>
			</Main>
		</SidebarLayout>
	)
}