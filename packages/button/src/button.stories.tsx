import { Button, Fab } from './button'
import { Plus } from 'phosphor-react'

export default {
  title: 'Button',
}

export let Default = () => {
	return (
    <div>
      <div>
        <Button>Werkbank</Button>
      </div>

      <div>
        <Button loading>Loading</Button>
      </div>

      <div>
        <Button disabled>Disabled</Button>
      </div>

      <div>
        <Button raised>Raised</Button>
      </div>
    </div>
  )
}

export let fab = () => {
  return <Fab><Plus /></Fab>
}