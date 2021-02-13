
type Task<T> = {
	name: string;
	task: T;
	resolve: (x: any) => any;
	reject: (x: any) => any;
}

type TaskCallback<T> = (task: T) => Promise<any>

export class TaskQueue<T> {
	private concurrency = 1
	private running = 0
	private tasks: Array<Task<T>> = []
	private listener = new Map<string, TaskCallback<T>>()
	private paused: boolean = false

	private async runTask(task: Task<T>) {
		this.running = this.running + 1

		let fn = this.listener.get(task.name)

		if (fn) {
			try {
				let result = await fn(task.task)
				task.resolve(result)
			} catch (err) {
				task.reject(err)
			}
		}

		this.running = this.running - 1

		if (this.paused) {
			return
		}

		let nextTask = this.tasks.shift()
		if (nextTask) {
			this.runTask(nextTask)
		}
	}

	private enqueueTask(task: Task<T>) {
		this.tasks.push(task)
	}

	push(name: string, task: T) {
    	return new Promise(async (resolve, reject) => {
    		if (this.paused === true) {
    			return this.enqueueTask({ name, task, resolve, reject })
    		}

    		if (this.running < this.concurrency) {
    			this.runTask({ name, task, resolve, reject })
    		}

    		this.enqueueTask({ name, task, resolve, reject })
    	})
	}

	on(name: string, fn: TaskCallback<T>) {
		this.listener.set(name, fn)
	}

	pause() {
		this.paused = true
	}

	start() {
		let nextTask = this.tasks.shift()
		if (nextTask) {
			this.runTask(nextTask)
		}
	}
}