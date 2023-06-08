import { TypeStringOrVNode } from "../@types";

export interface Page {
	modelValue?: number;
	page?: number;
	total: number;
	prev?: TypeStringOrVNode;
	next?: TypeStringOrVNode;
	sibling?: number;
	url?: string;
	ripple?: boolean;
}
