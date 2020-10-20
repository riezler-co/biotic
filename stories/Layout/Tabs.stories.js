import React from 'react'
import styled from 'styled-components'
import { SidebarLayout
			 , Aside
			 , Main
			 } from '@package/layout/main'

import { Tabs
			 , TabBar
			 , TabContent
			 , Tab
			 , useTabs
			 , useOpenTab
			 , TabPanel
			 , useTabState
			 , useDefaultTab
			 , useScrollState
			 , useRestoreScroll
			 , useOnTabClose
			 } from '@package/tabs/main'

import { RecoilRoot } from 'recoil'

export default {
	title: 'Layout/Tabs',
	component: Tabs,
	decorators: 
		[ (Story) => {
				return (
					<RecoilRoot>
						<Story />
					</RecoilRoot>
				)
			}
		],
}

export let Default = () => {
	let [open, setOpen] = React.useState(true)
	let tabs = useTabs()
	let openTab = useOpenTab()
	useDefaultTab(
		{ index: 0
		, type: 'dummy'
		, id: 'one'
		}
	)

	let push = () => {
		let fuu = Math.random()
		openTab.push(
			{ id: fuu
			, title: fuu
			, type: 'random'
			}
		)
	}

	let openStatic = (id) => () => {
		openTab.push(
			{ id
			, title: Math.random()
			, type: 'static'
			}
		)
	}

	return (
		<SidebarLayout>
			<Aside open={true} drawer='(max-width: 900px)' onClose={() => setOpen(false)}>
				<button onClick={push}>Open Random</button>
				<button onClick={openStatic('four')}>Open Four</button>
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

let Random = ({ id }) => {
	let [state, setState] = useTabState(id, {
		count: 0
	})

	let nestedId = `nested:${id}`
	let [, setScroll, cleanNested] = useScrollState(nestedId)
	let nested = useRestoreScroll(nestedId)

	function handleUp(argument) {
		setState({ count: state.count + 1 })
	}

	useOnTabClose(id, () => {
		cleanNested()
	})

	return (
		<Content>
			<h1>{ id }</h1>
			<h2>{ state.count }</h2>
			<button onClick={handleUp}>Up</button>

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

let StaticId = ({ id }) => {
	let [state, setState] = useTabState(id, {
		count: 0
	})

	let nestedId = `nested:${id}`
	let [, setScroll, cleanNested] = useScrollState(nestedId)
	let nested = useRestoreScroll(nestedId)

	function handleUp(argument) {
		setState({ count: state.count + 1 })
	}

	useOnTabClose(id, () => {
		cleanNested()
	})

	return (
		<Content>
			<h1>ID: { id }</h1>
			<h2>{ state.count }</h2>
			<button onClick={handleUp}>Up</button>

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