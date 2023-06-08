import { TypeStringOrVNode } from "../@types";

export interface TabItem {
	key: string;
	props?: Object;
	title: TypeStringOrVNode;
	content: TypeStringOrVNode;
	visible?: boolean;
}

export interface Tab {
	active?: string;
	vertical?: boolean;
	animateBar?: boolean;
	clickToggle?: boolean;
	navbarClass?: string;
	closable?: boolean;
	ripple?: boolean;
}
