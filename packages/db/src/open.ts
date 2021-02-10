
import { Migrations, Migration } from './migrations'
import { getAllItems$, updateItem } from './operations'

export type Config = {
	version: number;
	name: string;
	indicies?: Array<string>;
	migrations?: Array<Migration>;
	primary?: string;
	createIndex?: {
		[index: string]: (data: unknown) => string;
	};
	
	onGet?: (data: unknown) => any;
	onInsert?: (data: unknown) => any;
	onUpdate?: (data: unknown) => any;
	onDelete?: (data: unknown) => any;
	onWrite?: (data: unknown) => any;
}

export type Configs = Map<string, Config>

export type Options = {
	db: string;
	version: number;
}

export function open(
	configs: Configs,
	options: Options, 
): Promise<IDBDatabase> {
	return new Promise(async (resolve, reject) => {
		let MIGRATIONS = Migrations.get()
		let DBOpenRequest = indexedDB.open(options.db, options.version)

		DBOpenRequest.onerror = function(event) {
			reject(event)
		}

		DBOpenRequest.onsuccess = function(event) {
			resolve(DBOpenRequest.result)
		}

		DBOpenRequest.onupgradeneeded = async function(event) {
			let db = DBOpenRequest.result
			let trx = DBOpenRequest.transaction

			if (trx === null) {
				throw new Error('IDDB upgrade error, can not open transaction')
			}

			let lock: Promise<unknown> = (() => {
				return new Promise(resolve => {
					if (trx) {
						trx.oncomplete = function(event) {
							resolve(true)
						}
					} else {
						resolve(true)
					}
				})
			})()

			trx.onerror = function(event) {
				reject(event)
			}

			db.onerror = function(event) {
				reject(event)
			}

			for(let [table, option] of configs.entries()) {

				let tableExist = db.objectStoreNames.contains(table)

				let indicies = !option.indicies
					? []
					: option.indicies.concat(createIndexToString(option.createIndex))

				if (!tableExist) {
					console.log('Create table', table)
					let objectStore = db.createObjectStore(table, {
						keyPath: option.primary ?? 'id'
					})

					indicies.concat(['id']).forEach(index => {
						objectStore.createIndex(index, index, { unique: false })
					})
				} else {
					let objectStore = trx.objectStore(table)
					let migration = MIGRATIONS[table]
					let currentIndicies = migration?.indicies ?? []

					currentIndicies
						.filter(index => !indicies.includes(index))
						.forEach(index => {
							if (objectStore.indexNames.contains(index)) {
								objectStore.deleteIndex(index)
							}
						})

					indicies.forEach(index => {
						if (!objectStore.indexNames.contains(index)) {
							objectStore.createIndex(index, index, { unique: false })
						}
					})
				}
				
			}

			Array.from(db.objectStoreNames).forEach(os => {
				if (!configs.has(os) && db.objectStoreNames.contains(os)) {
		      		db.deleteObjectStore(os)
				}
			})

			await lock

			for(let [table, option] of configs.entries()) {
				
				let migration = MIGRATIONS[table]

				let version = migration?.version ?? 1

				if (version === option.version) {
					if (migration === undefined) {
						MIGRATIONS[table] = {
							version: option.version,
							indicies: option
								?.indicies
								?.concat(createIndexToString(option.createIndex)) ?? [],
						}
					}

					continue
				}

			  	if (version < option.version) {
			  		console.log('Run Migration: ', table)

			  		let migrations = option.migrations ?? []

			  		migrations.sort((a, b) => {
			  			return a.version - b.version
			  		})
			  		
			  		let start = migrations
			  			.findIndex(migration => migration.version > version)

			  		let applyMigrations = start && start >= 0 ? option?.migrations?.slice(start) ?? [] : []

			  		await getAllItems$(db, table, {}, async item => {
			  			let newItem = applyMigrations.reduce((oldItem, { migrate }) => migrate(oldItem), item)
			  			await updateItem(db, table, newItem as any)
			  		})

			  		MIGRATIONS[table] = {
			  			version: option.version,
			  			indicies: option?.indicies?.concat(createIndexToString(option.createIndex)) ?? [],
			  		}
			  		continue
			  	}

			  	Migrations.set(MIGRATIONS)
			}
		}
	})
}

function createIndexToString(obj?: Object) {

	if (!obj) {
		return []
	}

	return Object
		.entries(obj)
		.map(kv => `idx_${kv[0]}`)
}
