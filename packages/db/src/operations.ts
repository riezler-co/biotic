
interface Item {
	id: string;
}

export function insertItem<T extends Item>(
	db: IDBDatabase,
	tableName: string,
	data: T,
): Promise<T> {
	return new Promise((resolve, reject) => {
		let transaction = db.transaction([tableName], 'readwrite')
	 	let objectStore = transaction.objectStore(tableName)
		let objectStoreRequest = objectStore.put(data)
		
		objectStoreRequest.addEventListener('error', (error) => {
			reject(error)
		})
		
		objectStoreRequest.addEventListener('success', () => {
			resolve(data)
		})
	})
}

export function getItem<T>(
	db: IDBDatabase,
	tableName: string,
	key: string
): Promise<T> {
	return new Promise((resolve, reject) => {					
		let transaction = db.transaction([tableName], 'readwrite')
	 	let objectStore = transaction.objectStore(tableName)

		let objectStoreRequest = objectStore.get(key)
		
		objectStoreRequest.addEventListener('error', (error) => {
			reject(error)
		})
		
		objectStoreRequest.addEventListener('success', () => {
			resolve(objectStoreRequest.result as T)
		})
	})
}

export function updateItem<T extends Item>(
	db: IDBDatabase,
	tableName: string,
	data: T
): Promise<T> {
	return new Promise((resolve, reject) => {
		let transaction = db.transaction([tableName], 'readwrite')
	 	let objectStore = transaction.objectStore(tableName)
		let objectStoreRequest = objectStore.put(data)
		
		objectStoreRequest.addEventListener('error', (error) => {
			reject(error)
		})
		
		objectStoreRequest.addEventListener('success', () => {
			resolve(data)
		})
	})
}

export function deleteItem(
	db: IDBDatabase,
	tableName: string,
	key: string,
): Promise<void> {
	return new Promise((resolve, reject) => {
		let transaction = db.transaction([tableName], 'readwrite')
	 	let objectStore = transaction.objectStore(tableName)

		let objectStoreRequest = objectStore.delete(key)
		
		objectStoreRequest.addEventListener('error', (error) => {
			reject(error)
		})
		
		objectStoreRequest.addEventListener('success', () => {
			resolve()
		})
	})
}

type Query =  {
	query?: string | null,
	indexName?: string,
}

export function getAllItems<T>(
	db: IDBDatabase,
	tableName: string,
	{ query = null, indexName = 'id' }: Query
): Promise<Array<T>> {
	return new Promise((resolve, reject) => {
		let transaction = db.transaction([tableName], 'readwrite')

		transaction.onerror = (error) => {
			reject({
				type: 'transaction',
				fn: 'getAllItems',
				error,
				query,
				indexName
			})
		}

	 	let objectStore = transaction.objectStore(tableName)
	 	let index = objectStore.index(indexName)
	 	let keyrange = query ? IDBKeyRange.only(query) : null
		let request = index.openCursor(keyrange)
		
		request.addEventListener('error', (error) => {
			reject(error)
		})
		
		let result: Array<T> = []
		request.addEventListener('success', (event) => {
			let cursor = request.result;
			if(cursor) {
				result.push(cursor.value as T)
				cursor.continue()
			} else {
				resolve(result as Array<T>)
			}
		})
	})
}

export function getAllItems$<T>(
	db: IDBDatabase,
	tableName: string,
	{ query = null, indexName = 'id' }: Query,
	cb: (entry: T) => void,
) {
	return new Promise((resolve, reject) => {
		let transaction = db.transaction([tableName], 'readwrite')
	 	let objectStore = transaction.objectStore(tableName)
	 	let index = objectStore.index(indexName)
	 	let keyrange = query ? IDBKeyRange.only(query) : null
		let request = index.openCursor(keyrange)
		
		request.addEventListener('error', (error) => {
			reject(error)
		})
		
		request.addEventListener('success', (event) => {
			let cursor = request.result;
			if(cursor) {
				cb(cursor.value as T)
				cursor.continue()
			}
		})
	})
}

export function clearStore(transaction: IDBTransaction, store: string): Promise<void> {
	return new Promise((resolve, reject) => {
		let objectStore = transaction.objectStore(store)
		let objectStoreRequest = objectStore.clear()

		objectStoreRequest.onerror = function(error) {
		  reject(error)
		}

		objectStoreRequest.onsuccess = function(event) {
		  resolve()
		}
	})
}

export function clearData(
	db: IDBDatabase,
	tables: Array<string>,
	dbName: string
): Promise<void> {
	return new Promise(async (resolve, reject) => {
		console.log('clear db', dbName)

		let transaction = db.transaction(tables, "readwrite")

		transaction.oncomplete = function(event) {
			resolve()
		}

		transaction.onerror = function(event) {
			reject(event)
		}
		
		let sink = tables.map(table => {
			console.log('Clear table: ', table)
			return clearStore(transaction, table)	
		})

		await Promise.all(sink)

	})
};
