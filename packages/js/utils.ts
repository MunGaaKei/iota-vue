import { VNode, h } from "vue";

export function isMobile(): boolean {
	return "ontouchend" in document;
}

export function uuid(digit: number = 8): string {
	let dt = new Date().getTime();
	return "x".repeat(digit).replace(/[xy]/g, function () {
		let r = (dt + Math.random() * 16) % 16 | 0;
		dt = Math.floor(dt / 16);
		return r.toString(16);
	});
}
