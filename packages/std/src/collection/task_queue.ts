
type Task<T> = {
	name: string;
	task: T;
	resolve: (x: any) => any;
	reject: (x: any) => any;
}

type TaskCallback<T> = (task: T) => void

export class TaskQueue {
	private concurrency = 1
	private running = 0
	private tasks: Array<Task<unknown>> = []
	private listener = new Map<string, TaskCallback<any>>()
	private paused: boolean = false

	private async runTask(task: Task<unknown>) {
		this.running = this.running + 1

		let fn = this.listener.get(task.name)

		if (fn) {
			try {
				let result = await Promise.resolve(fn(task.task))
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

	private enqueueTask(task: Task<unknown>) {
		this.tasks.push(task)
	}

	push<T>(name: string, task: T) {
    	return new Promise(async (resolve, reject) => {
    		if (this.paused === true) {
    			return this.enqueueTask({ name, task, resolve, reject })
    		}

    		if (this.running < this.concurrency) {
    			return this.runTask({ name, task, resolve, reject })
    		}

    		this.enqueueTask({ name, task, resolve, reject })
    	})
	}

	on<T>(name: string, fn: TaskCallback<T>) {
		this.listener.set(name, fn)
	}

	pause() {
		this.paused = true
	}

	start() {
		this.paused = false
		let nextTask = this.tasks.shift()
		if (nextTask) {
			this.runTask(nextTask)
		}
	}
}