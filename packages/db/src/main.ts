

export {
	Db as default
} from './db'


export type {
	UpdateEvent,
	InsertEvent,
	DeleteEvent,
	ChangeEvent,
	SetterOrUpater,
	GetAllOption,
	Table,
} from './table'

export { Changes } from './table'


export type { 
	KeyValue
} from './key_value'


export type {
	Config as TableConfig, 
	Configs as TableConfigs,
	Options as DbConfig,
} from './open'

export {
	open
} from './open'


export type {
	Item
} from './operations'

export {
	insertItem,
	getItem,
	updateItem,
	deleteItem,
	getAllItems,
	getAllItems$,
	clearStore,
	clearData,
} from './operations'
