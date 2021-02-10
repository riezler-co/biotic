import { Config } from './open'

export enum On {
	Insert,
	Update,
	Delete,
	Get,
}

export enum HookType {
	Index,
	Lifecycle,
}

export type HookConfig = {
	type: HookType;
	on: Array<On>;
	fn: (item: any) => any; 
}

export type Hooks = Array<HookConfig>

export function makeIndexHooks<T>(createIndex?: Object): Hooks {
		
	if (!createIndex) {
		return []
	}

	return Object.entries(createIndex).map(kv => {
		let [index, hook] = kv
		let indexName = `idx_${index}`

		let fn = (item: T) => {
			let result = hook(item as T)
			return { [indexName]: result }
		}

		return {
			type: HookType.Index,
			on: [On.Insert, On.Update],
			fn
		}
	})
}

export function collectHooks<T>({
	onGet,
	onInsert,
	onUpdate,
	onDelete,
	onWrite,
	createIndex
}: Config) {

	let hooks = []

	if (onGet) {
		hooks.push({
			type: HookType.Lifecycle,
			on: [On.Get],
			fn: (item: T) => onGet(item)
		})
	}

	if (onInsert) {
		hooks.push({
			type: HookType.Lifecycle,
			on: [On.Insert],
			fn: (item: T) => onInsert(item)
		})
	}

	if (onUpdate) {
		hooks.push({
			type: HookType.Lifecycle,
			on: [On.Update],
			fn: (item: T) => onUpdate(item)
		})
	}

	if (onDelete) {
		hooks.push({
			type: HookType.Lifecycle,
			on: [On.Delete],
			fn: (item: T) => onDelete(item)
		})
	}

	if (onWrite) {
		hooks.push({
			type: HookType.Lifecycle,
			on: [On.Insert, On.Update],
			fn: (item: T) => onWrite(item)
		})
	}

	return hooks.concat(makeIndexHooks<T>(createIndex))
}

export function runIndexHook(acc: Object, { fn }: HookConfig): Object {
	let extraIndex = fn(acc)
	return {
		...acc,
		...extraIndex
	}
}