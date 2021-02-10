import {
	Config as TableConfig,
	Options as DbConfig,
	open,
} from './open'

import { Table } from './table'
import { KeyValue } from './key_value'
import { Item, clearData } from './operations'

import { collectHooks } from './hooks'

type Config = {
	version: 1
}

export class Db {
	name: string
	config: Config

	private tableConfigs: Map<string, TableConfig>

	constructor(name: string, config: Config) {
		this.name = name
		this.config = config

		this.tableConfigs = new Map()
	}

	tableCreate<T extends Item>(config: TableConfig) {
		this.tableConfigs.set(config.name, config)
		let hooks = collectHooks<T>(config)
		let db = { db: this.name, version: this.config.version }
		return new Table<T>(config.name, this.tableConfigs, db, hooks)
	}

	kvCreate<T>(config: TableConfig) {
		this.tableConfigs.set(config.name, config)
		let hooks = collectHooks<T>(config)
		let db = { db: this.name, version: this.config.version }
		return new KeyValue<T>(config.name, this.tableConfigs, db, hooks)
	}

	async clear() {
		let dbConfig = { db: this.name, version: this.config.version }
		let db = await open(this.tableConfigs, dbConfig)
		let tables = Array.from(this.tableConfigs.keys())
		return clearData(db, tables, this.name)
	}
}