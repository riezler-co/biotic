import { Subject, Observable } from 'rxjs'
import { mergeMap, filter, switchMap } from 'rxjs/operators'

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

import {
	Hooks,
	On,
	HookType,
	runIndexHook,
} from './hooks'

export enum Changes {
	Update,
	Insert,
	Delete,
}

export type UpdateEvent<T> = {
	type: typeof Changes.Update,
	id: string,
	data: {
		oldValue: T | null,
		newValue: T,
	}
}

export type InsertEvent<T> = {
	type: typeof Changes.Insert,
	id: string,
	data: {
		oldValue: undefined,
		newValue: T,
	}
}

export type DeleteEvent<T> = {
	type: typeof Changes.Delete,
	id: string,
	data: {
		oldValue: T,
		newValue: undefined,
	}
}

export type ChangeEvent<T> =
	| UpdateEvent<T>
	| InsertEvent<T>
	| DeleteEvent<T>

export type SetterOrUpater<T> =
	| T
	| ((value: T | null) => T) 


export type GetAllOption = {
	index: string
}

export class Table<T extends Item> {

	private change$ = new Subject<ChangeEvent<T>>()

	tableConfigs: Configs
	dbConfig: Options
	config: Config
	hooks: Hooks

	constructor(
		table: string,
		tableConfigs: Configs,
		dbConfig: Options,
		hooks: Hooks,
	) {
		this.tableConfigs = tableConfigs
		this.dbConfig = dbConfig
		this.config = tableConfigs.get(table)!
		this.hooks = hooks
	}

	get(id: string): Observable<T | null> {
		return new Observable<T | null>(subscriber => {
			open(this.tableConfigs, this.dbConfig).then(async db => {
				let currentItem = await getItem<T>(db, this.config.name, id)

				let data = this.hooks
					.filter(hook => hook.on.includes(On.Get))
					.reduce((acc, hook) => hook.fn(acc) ?? acc, currentItem)

				subscriber.next(data)
				subscriber.complete()
			})
			.catch(error => subscriber.error(error))
		})
	}

	getAll(key?: string, options?: GetAllOption): Observable<T> {
		let indexName = options?.index ?? 'id'
		let query = key ?? null

		return new Observable<T>(subscriber => {
			open(this.tableConfigs, this.dbConfig).then(async db => {
				let options = { query, indexName }
				let hooks = this.hooks.filter(hook => hook.on.includes(On.Get))
				
				await getAllItems$<T>(db, this.config.name, options, currentItem => {
					let data = hooks.reduce((acc, hook) => hook.fn(acc) ?? acc, currentItem)
					subscriber.next(data)
				})
				subscriber.complete()
			})
			.catch(error => subscriber.error(error))
		})
	}

	insert(value: T): Observable<T> {
		return new Observable<T>(subscriber => {
			open(this.tableConfigs, this.dbConfig).then(async db => {
				let data = this.hooks
					.filter(hook => hook.on.includes(On.Insert))
					.reduce((acc, hook) => {
						if (hook.type === HookType.Index) {
							return runIndexHook(acc, hook)
						} else {
							return hook.fn(acc) ?? acc
						}
					}, value)

				await insertItem(db, this.config.name, data)
				subscriber.next(value)
				subscriber.complete()

				this.change$.next({
					type: Changes.Insert,
					id: data.id,
					data: {
						oldValue: undefined,
						newValue: value,
					}
				})
			})
			.catch(error => subscriber.error(error))
		})
	}

	update(id: string, updater: SetterOrUpater<T>): Observable<T> {
		return new Observable<T>(subscriber => {
			open(this.tableConfigs, this.dbConfig).then(async db => {
				let currentItem = await getItem<T>(db, this.config.name, id)
				let nextValue = updater instanceof Function
					? updater(currentItem)
					: { ...currentItem, ...updater }


				let data = this.hooks
					.filter(hook => hook.on.includes(On.Update))
					.reduce((acc, hook) => {
						if (hook.type === HookType.Index) {
							return runIndexHook(acc, hook)
						} else {
							return hook.fn(acc) ?? acc ?? acc
						}
					}, nextValue)

				await updateItem(db, this.config.name, data)

				subscriber.next(nextValue)
				subscriber.complete()

				this.change$.next({
					type: Changes.Update,
					id: nextValue.id,
					data: {
						oldValue: currentItem,
						newValue: nextValue,
					}
				})
			})
			.catch(error => subscriber.error(error))
		})
	}

	upsert(id: string, value: T): Observable<T> {
		return this.get(id).pipe(
			switchMap(item => {
				if (item === null) {
					return this.insert(value)
				} else {
					return this.update(id, value)
				}
			})
		)
	}

	updateAll(updater: SetterOrUpater<T>) {
		return new Observable(subscriber => {
			open(this.tableConfigs, this.dbConfig).then(db => {

				let hooks = this.hooks
					.filter(hook => hook.on.includes(On.Update))

				let newItems = this.getAll().pipe(
					mergeMap(async currentItem => {
						let newValue = updater instanceof Function
							? updater(currentItem)
							: { ...currentItem, ...updater }

						let data = hooks.reduce((acc, hook) => {
							if (hook.type === HookType.Index) {
								return runIndexHook(acc, hook)
							} else {
								return hook.fn(acc) ?? acc
							}
						}, newValue)

						await updateItem(db, this.config.name, data)

						return [currentItem!, data]
					}),
				)

				let next = ([oldValue, newValue]: T[]) => {
					this.change$.next({
						type: Changes.Update,
						id: oldValue.id,
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

	delete(id: string): Observable<T> {
		return new Observable<T>(subscriber => {
			open(this.tableConfigs, this.dbConfig).then(async db => {
				let oldValue = await getItem<T>(db, this.config.name, id)
				await deleteItem(db, this.config.name, id)

				subscriber.next(oldValue!)
				subscriber.complete()

				this.hooks
					.filter(hook => hook.on.includes(On.Delete))
					.reduce((acc, hook) => hook.fn(acc) ?? acc, oldValue)

				this.change$.next({
					type: Changes.Delete,
					id: oldValue!.id,
					data: {
						oldValue: oldValue!,
						newValue: undefined,
					}
				})
			})
			.catch(error => subscriber.error(error))
		})
	}

	deleteAll(): Observable<T> {
		return new Observable(subscriber => {
			open(this.tableConfigs, this.dbConfig).then(async db => {

				let hooks = this.hooks
					.filter(hook => hook.on.includes(On.Delete))

				let next = (item: T | null) => {
					subscriber.next(item!)
					this.change$.next({
						type: Changes.Delete,
						id: item!.id,
						data: {
							oldValue: item!,
							newValue: undefined,
						}
					})

					hooks.reduce((acc, hook) => hook.fn(acc) ?? acc, item)
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

	changes(id?: string): Observable<ChangeEvent<T>> {
		if (!id) {
			return this.change$
		} else {
			return this.change$.pipe(
				filter(change => change.id === id)
			)
		}
	}

	async size(): Promise<number> {
		let db = await open(this.tableConfigs, this.dbConfig)
		let transaction = db.transaction([this.config.name], 'readonly')
		let objectStore = transaction.objectStore(this.config.name)

		return new Promise((resolve, reject) => {
			let countRequest = objectStore.count()

			countRequest.onsuccess = () => {
			 	resolve(countRequest.result)
			}

			countRequest.onerror = (error) => {
				reject(error)
			}
		})
	}
}