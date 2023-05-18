import type { Component, VNode } from "vue";

export interface Icon {
	icon: VNode | Component;
	size?: string;
	align?: string;
}
