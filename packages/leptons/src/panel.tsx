import styled, { css } from 'styled-components'

export let Basement = css`
	box-shadow: inset 0 0 var(--baseline-3) var(--baseline-5) rgba(0,0,0, 0.2);
`

type PanelProps = {
	side?: 'left' | 'right'
}
export let Panel = styled.div<PanelProps>`
	--default-panel-shadow: rgba(0,0,0,0.2);

	${p => p.side === 'left'
		? `
			box-shadow: inset calc(var(--baseline) * 10) 0 calc(var(--baseline) * 12) 0 var(--panel-shadow, var(--default-panel-shadow))
					  , 0 0 calc(var(--baseline) * -3) var(--baseline) var(--panel-shadow, var(--default-panel-shadow))
		`
		: `
			box-shadow: inset calc(var(--baseline) * -10) 0 calc(var(--baseline) * 12) 0 var(--panel-shadow, var(--default-panel-shadow))
					  , 0 0 calc(var(--baseline) * 3) calc(var(--baseline) * -1) var(--panel-shadow, var(--default-panel-shadow))
		`
	};
	${p => p.side === 'left'
		? 'border-top-right-radius: var(--baseline-5)'
		: 'border-top-left-radius: var(--baseline-5)'
	};
	${p => p.side === 'left'
		? 'border-right: var(--border)'
		: 'border-left: var(--border)'
	};

	${p => p.side === 'left'
		? 'left: 0'
		: 'right: 0'
	};

	top: 0;
	overflow: auto;
	position: absolute;
	height: 100%;
	background: #fff;
`