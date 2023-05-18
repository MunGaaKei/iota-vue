interface Config {
	text: string;
}

export function warn({ text }: Config) {
	console.warn(`[IOTA] ${text}`);
}

export function error({ text }: Config) {
	console.error(`[IOTA] ${text}`);
}
