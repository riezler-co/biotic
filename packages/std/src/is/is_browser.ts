
export function isBrowser(): boolean {
	return typeof window !== 'undefined' && 'localStorage' in window
}