import { TypeStringOrVNode } from "../@types";

export type ListType = "option" | "number" | "circle" | "leading-zero";

export interface List {
	type?: ListType;
	labelWidth?: string;
	labelAlign?: "left" | "right";
}

export interface ListItem {
	label?: TypeStringOrVNode;
	type?: "title" | "item";
	active?: boolean;
}
