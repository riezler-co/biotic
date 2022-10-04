
export function isBrowser(it: any = globalThis): boolean {
	return typeof it.window !== 'undefined' && 'localStorage' in it
}