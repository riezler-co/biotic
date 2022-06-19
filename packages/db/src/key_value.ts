import { map, toArray } from 'rxjs/operators'

import { Table } from './table'
import { Configs, Options } from './open'
import { Hooks } from './hooks'

type KVItem<T> = {
	id: string;
	value: T;
} 

export class KeyValue<T> {
	private table: Table<KVItem<T>>

	constructor(
		table: string,
		tableConfigs: Configs,
		dbConfig: Options,
		hooks: Hooks,
	) {
		this.table = new Table(table, tableConfigs, dbConfig, hooks)
	}

	get(key: string): Promise<T | null> {
		return this.table
			.get(key)
			.pipe(map(item => item?.value ?? null))
			.toPromise()
	}

	async set(key: string, value: T): Promise<KeyValue<T>> {
		await this.table
			.upsert(key, { id: key, value })
			.toPromise()

		return this
	}

	async delete(key: string): Promise<boolean>  {
		let hasEntry = await this.has(key)

		if (!hasEntry) {
			return false
		}

		await this.table.delete(key).toPromise()
		return true
	}

	has(key: string): Promise<boolean> {
		return this.table
			.get(key)
			.pipe(map(value => value !== null))
			.toPromise()
	}

	size(): Promise<number> {
		return this.table.size()
	}

	clear(): Promise<unknown> {
		return this.table.deleteAll().toPromise()
	}

	keys(): Promise<Array<string>> {
		return this.table
			.getAll()
			.pipe(
				map(entry => entry.id),
				toArray(),
			)
			.toPromise()
	}

	values(): Promise<Array<T>> {
		return this.table
			.getAll()
			.pipe(
				map(entry => entry.value),
				toArray(),
			)
			.toPromise()
	}

	entries(): Promise<Array<[string, T]>> {
		return this.table
			.getAll()
			.pipe(
				map(entry => [entry.id, entry.value] as [string, T]),
				toArray(),
			)
			.toPromise()
	}

	async forEach(fn: (item: T, key: string, map: KeyValue<T>) => any): Promise<void> {
		let values = await this.entries()
		values.forEach(([key, item]) => fn(item, key, this))	
	}

	changes(key?: string) {
		return this.table.changes(key)
	}
}