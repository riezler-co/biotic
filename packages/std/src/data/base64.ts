
export function base64url(str: string): string {
	return window.btoa(str).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '')
}