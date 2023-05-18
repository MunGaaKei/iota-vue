import { TypeStringOrVNode } from "../@types";

export interface Page {
	total: number;
	modelValue: number;
	prev?: TypeStringOrVNode;
	next?: TypeStringOrVNode;
	sibling?: number;
	url?: string;
	ripple?: boolean;
}
