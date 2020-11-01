import { createContext } from 'react'

type Ctx = 
	{ moveItem: (drag: number, hover: number) => void
	; dropItem: (item: any) => void
	; item: any
	; setItem: (item: any) => void 
	}

export let SortableCtx = createContext<Ctx>(
	{ moveItem: (d, h) => {}
	, dropItem: (item) => {}
	, item: null
	, setItem: (item) => {}
	}
)