import { TypeStringOrVNode } from "../@types";

export type TabKey = string;

export interface TabItem {
	key: TabKey;
	props?: Object;
	title: TypeStringOrVNode;
	content: TypeStringOrVNode;
	visible?: boolean;
}

export interface Tab {
	active?: TabKey;
	vertical?: boolean;
	animateBar?: boolean;
	clickToggle?: boolean;
	navbarClass?: string;
	closable?: boolean;
	ripple?: boolean;
}
