
import {
	Boson,
	BosonConfig,
	boson,
} from './boson'

type FillOptions = {
	clear?: boolean
}

export interface CreateBoson<T extends Array<any>, S> {
	(...args: T): Boson<S>;
	cache: Map<string, Boson<S>>;
	fill: (entries: Array<[T, S]>, options: FillOptions) => void;
}

export function bosonFamily<T extends Array<any>, S>(
	createBoson: (...args: T) => BosonConfig<S>,
	getKey: (...args: T) => string = (...args) => args.join(':'),
): CreateBoson<T, S> {

	let cache = new Map<string, Boson<S>>()

	let fn = (...args: T) => {
		let key = getKey(...args)

		if (cache.has(key)) {
			return cache.get(key)!
		}

		let config = createBoson(...args)
		let b = boson(config)
		cache.set(key, b)

		return b
	}

	let fill = (entries: Array<[T, S]>, options: FillOptions = {}) => {
		if (options.clear) {
			cache.clear()
		}

		entries.forEach(([args, value]) => {
			let key = getKey(...args)
			let config = createBoson(...args)
			let b = boson(config, value)
			cache.set(key, b)
		})
	}

	return Object.assign(fn, { cache, fill })
}