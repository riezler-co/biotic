import '@biotic-ui/leptons/style/base.css'
import { TopBar } from "."
import '../../style/topbar.css'

export default {
	title: 'Layout/Topbar'
}

export let Default = () => {
	return (
		<TopBar.Container style={{ height: '90vh' }}>
			<TopBar.Header>
				<h3>Header</h3>
			</TopBar.Header>
			<TopBar.Content>
				<div style={{ width: '100%', maxWidth: 600, height: '150vh', background: 'lightgrey', padding: '2rem' }}>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam temporibus accusantium officia vel, ipsum. Voluptatibus, optio illo numquam eum itaque explicabo magni, iusto error, eos labore hic obcaecati repudiandae earum laboriosam, quidem deleniti. Soluta, amet. Assumenda quod, officia magni molestias, asperiores error odio. Ea ipsam iusto mollitia illum velit illo sequi, hic maxime recusandae provident architecto unde officiis incidunt. Ducimus recusandae temporibus enim nisi, architecto deleniti excepturi eligendi molestias harum? Magnam sint, est odit sed suscipit voluptatum eligendi modi illum aperiam accusamus numquam. Cupiditate, veniam iste culpa quas doloremque aliquam quisquam alias eius eligendi aut corrupti earum illum esse magnam molestiae voluptate minus, blanditiis tenetur officia perferendis voluptas repellendus autem sunt aspernatur perspiciatis. Sint, consequatur. Neque officiis modi aliquid, facere architecto exercitationem alias tempora sed dolore vero incidunt nostrum assumenda porro eius deleniti temporibus id voluptatum optio. Sint hic excepturi iusto nisi dolor corrupti inventore dignissimos dicta delectus, molestias nulla est tempora, quia optio dolorum! Doloremque, animi. Laudantium saepe, recusandae illum sequi, omnis maiores mollitia autem velit est a assumenda. Quas corporis quo eius dicta, doloribus tempore ipsum. Voluptates eligendi excepturi, voluptatem reiciendis doloribus porro omnis distinctio placeat harum repellat suscipit soluta et fugiat iusto commodi, adipisci, autem nesciunt nostrum ipsa quaerat sapiente qui laboriosam, ea. Tempora libero autem ex dolore dicta assumenda excepturi quibusdam magnam voluptates ipsum, quasi aspernatur veniam aut. Eos quae numquam maxime dolorem veritatis error enim et quaerat amet ullam non quos omnis est nulla quis minus sunt eveniet, assumenda totam praesentium. Illo commodi beatae iste dolore voluptatibus voluptate quidem, omnis voluptatum a, doloribus ullam optio perspiciatis minima nesciunt, dolor, eos corrupti magni repudiandae amet facilis expedita adipisci. Modi rem, ducimus ex sapiente saepe odio, consequatur quis quasi voluptate voluptatem voluptas, cum tempore iure, eligendi nisi eveniet hic itaque vel? Nulla temporibus repudiandae sit sapiente, debitis.
					</p>
				</div>
			</TopBar.Content>
		</TopBar.Container>
	)
}