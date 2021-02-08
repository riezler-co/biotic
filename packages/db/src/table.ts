import { Subject, Observable } from 'rxjs'
import { mergeMap } from 'rxjs/operators'

import { open, Configs, Options, Config } from './open'
import {
	getItem,
	insertItem,
	updateItem,
	Item,
	getAllItems$,
	deleteItem,
	clearStore,
} from './operations';

enum Changes {
	Update,
	Insert,
	Delete,
}

type UpdateEvent<T> = {
	type: typeof Changes.Update,
	data: {
		oldValue: T | null,
		newValue: T,
	}
}

type InsertEvent<T> = {
	type: typeof Changes.Insert,
	data: {
		oldValue: undefined,
		newValue: T,
	}
}

type DeleteEvent<T> = {
	type: typeof Changes.Delete,
	data: {
		oldValue: T,
		newValue: undefined,
	}
}

type ChangeEvent<T> =
	| UpdateEvent<T>
	| InsertEvent<T>
	| DeleteEvent<T>

type SetterOrUpater<T> =
	| T
	| ((value: T | null) => T) 


type GetAllOption = {
	index: string
}

export class Table<T extends Item> {

	private change$ = new Subject<ChangeEvent<T>>()
	private db: Promise<IDBDatabase>

	tableConfigs: Configs
	dbConfig: Options
	config: Config

	constructor(
		table: string,
		tableConfigs: Configs,
		dbConfig: Options,
	) {
		this.tableConfigs = tableConfigs
		this.dbConfig = dbConfig
		this.config = tableConfigs.get(table)!
		this.db = open(tableConfigs, dbConfig)
	}

	get(id: string) {
		return new Observable<T | null>(subscriber => {
			this.db.then(async db => {
				let currentItem = await getItem<T>(db, this.config.name, id)
				subscriber.next(currentItem)
				subscriber.complete()
			})
			.catch(error => subscriber.error(error))
		})
	}

	getAll(key?: string, options?: GetAllOption) {
		let indexName = options?.index ?? 'id'
		let query = key ?? null

		return new Observable<T | null>(subscriber => {
			this.db.then(async db => {
				let options = { query, indexName }
				await getAllItems$<T>(db, this.config.name, options, currentItem => {
					subscriber.next(currentItem)
				})
				subscriber.complete()
			})
			.catch(error => subscriber.error(error))
		})
	}

	insert(value: T) {
		return new Observable<T>(subscriber => {
			this.db.then(async db => {

				await insertItem(db, this.config.name, value)
				subscriber.next(value)
				subscriber.complete()

				this.change$.next({
					type: Changes.Insert,
					data: {
						oldValue: undefined,
						newValue: value,
					}
				})
			})
			.catch(error => subscriber.error(error))
		})
	}

	update(id: string, updater: SetterOrUpater<T>) {
		return new Observable<T>(subscriber => {
			this.db.then(async db => {
				let currentItem = await getItem<T>(db, this.config.name, id)
				let nextValue = updater instanceof Function
					? updater(currentItem)
					: { ...currentItem, ...updater }

				await updateItem(db, this.config.name, nextValue)

				subscriber.next(nextValue)
				subscriber.complete()

				this.change$.next({
					type: Changes.Update,
					data: {
						oldValue: currentItem,
						newValue: nextValue,
					}
				})
			})
			.catch(error => subscriber.error(error))
		})
	}

	updateAll(updater: SetterOrUpater<T>) {
		return new Observable(subscriber => {
			this.db.then(db => {
				let newItems = this.getAll().pipe(
					mergeMap(async currentItem => {
						let newValue = updater instanceof Function
							? updater(currentItem)
							: { ...currentItem, ...updater }

						await updateItem(db, this.config.name, newValue)

						return [currentItem!, newValue]
					}),
				)

				let next = ([oldValue, newValue]: T[]) => {
					this.change$.next({
						type: Changes.Update,
						data: { oldValue, newValue }
					})
				}

				newItems.subscribe({
					next,
					error: subscriber.error,
					complete: subscriber.complete
				})
			})
			.catch(error => subscriber.error(error))
		})
	}

	delete(id: string) {
		return new Observable<T>(subscriber => {
			this.db.then(async db => {
				let oldValue = await getItem<T>(db, this.config.name, id)
				await deleteItem(db, this.config.name, id)

				subscriber.next(oldValue!)
				subscriber.complete()

				this.change$.next({
					type: Changes.Delete,
					data: {
						oldValue: oldValue!,
						newValue: undefined,
					}
				})
			})
			.catch(error => subscriber.error(error))
		})
	}

	deleteAll() {
		return new Observable(subscriber => {
			this.db.then(async db => {

				let next = (item: T | null) => {
					subscriber.next(item!)
					this.change$.next({
						type: Changes.Delete,
						data: {
							oldValue: item!,
							newValue: undefined,
						}
					})
				}

				this.getAll().subscribe({
					next,
					error: subscriber.error,
					complete: subscriber.complete,
				})

				clearStore(db, this.config.name)
			})
			.catch(error => subscriber.error(error))
		})
	}

	changes(): Subject<ChangeEvent<T>> {
		return this.change$
	}
}