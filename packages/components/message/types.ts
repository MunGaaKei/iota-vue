import type { TypeStringOrVNode } from "../@types";

export interface MessageConfig {
	duration?: number;
	closable?: boolean;
	classname?: string;
	fromStart?: boolean;
	bottom?: boolean;
	align?: "center" | "left" | "right";
	gap?: number;
	max?: number;
	offset?: string;
}

export interface Message {
	id?: string;
	content: TypeStringOrVNode;
	active?: boolean;
	offsetTop?: string;
	close?: Function;
	onClose?: Function;
	duration?: number;
	fromStart?: boolean;
	classname?: string;
	closable?: boolean;
	timer?: ReturnType<typeof setTimeout>;
}
