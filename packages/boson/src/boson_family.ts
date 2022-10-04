import { Boson, BosonConfig, boson } from './boson'
import { nanoid } from 'nanoid'

type FillOptions = {
	clear?: boolean
}

export interface CreateBoson<T extends Array<any>, S> {
	(...args: T): Boson<S>;
	cache: Map<string, Boson<S>>;
	fill: (entries: Array<[T, S]>, options: FillOptions) => void;
}

type FamilyConfig<S> = Omit<BosonConfig<S>, 'key'> & {
	expireIn?: number
}

export function bosonFamily<T extends Array<any>, S>(
	createBoson: (...args: T) => FamilyConfig<S>,
	getKey: (...args: T) => string = (...args) => args.join(':'),
): CreateBoson<T, S> {
	let ID = nanoid()

	let familiyConfig = {
		expireIn: 5 * 60 * 1000,
	}

	let cache = new Map<string, Boson<S>>()

	function create(key: string, args: T, initalValue?: S) {
		let { expireIn ,...config } = createBoson(...args)
		familiyConfig.expireIn = expireIn ?? familiyConfig.expireIn

		let b = boson({ ...config, key }, initalValue)
		cache.set(key, b)
		return b
	}

	let fn = (...args: T) => {
		let key = `${ID}:${getKey(...args)}`
		let cached = cache.get(key)
		
		if (cached) {
			return cached
		}

		return create(key, args)
	}

	let fill = (entries: Array<[T, S]>, options: FillOptions = {}) => {
		if (options.clear) {
			cache.clear()
		}

		entries.forEach(([args, value]) => {
			let key = `${ID}:${getKey(...args)}`
			create(key, args, value)
		})
	}

	return Object.assign(fn, { cache, fill })
}