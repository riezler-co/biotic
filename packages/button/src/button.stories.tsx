import { Button, Fab } from './button'
import { Plus } from 'phosphor-react'
import styled from 'styled-components'
import { useState } from 'react'

let StyledButton = styled(Button)`
  --button-bg: green;
  --button-bg--hover: #199519;
  --button-color: #fff;

  --button-raised-color: #f0f;
  --button-raised-bg: lightblue;
  --button-border: 1px dashed #f0f;
  --button-raised-bg--hover: #7dcfea;
`

export default {
  title: 'Button',
}

let props: Array<[boolean, boolean, boolean, string]> = [
/* Loading, Disabled, Raised, Label */
  [false, false, false, 'Default'],
  [true, false, false, 'Default - Loading'],
  [false, true, false, 'Default - Disabled'],
  [false, false, true, 'Raised'],
  [false, true, true, 'Raised - Disabled'],
  [true, false, true, 'Raised - Loading'],
]

export let Default = () => {
	return (
    <>
      <h2>Default Buttons</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
        {
          props.map(([loading, disabled, raised, label]) => {
            return <Button loading={loading} disabled={disabled} raised={raised}>{ label }</Button>
          })
        }
      </div>

      <h2>Styled Buttons</h2>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {
          props.map(([loading, disabled, raised, label]) => {
            return <StyledButton loading={loading} disabled={disabled} raised={raised}>{ label }</StyledButton>
          })
        }
      </div>
    </>
  )
}

export let fab = () => {
  let [loading, setLoading] = useState(false)
  let [disabled, setDisabled] = useState(false)
  return (
    <>
      <Button onClick={() => setLoading(!loading)}>Toggle Loading</Button>
      <Button onClick={() => setDisabled(!disabled)}>Toggle Disabled</Button>
      <Fab loading={loading} disabled={disabled} raised><Plus /></Fab>
    </>
  )
}