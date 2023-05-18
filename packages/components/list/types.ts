import type { VNode } from "vue";

type TypeLabel = string | VNode | Object;

export interface List {
	labelWidth?: string;
	type?: "option" | "number" | "circle";
	labelAlign?: "left" | "right";
}

export interface ListItem {
	label?: TypeLabel;
	type?: "title" | "item";
	active?: boolean;
}
