import { Component, VNode } from "vue";

export interface Menu {
	items: MenuItem[];
	depth?: number;
	selectable?: boolean;
	selected?: MenuItem;
	round?: boolean;
	ripple?: boolean;
}
export interface MenuItem {
	type?: "title" | "node";
	title: string;
	icon?: VNode | Component | (() => VNode);
	[key: string]: any;
}
