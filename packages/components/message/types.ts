import type { TypeStringOrVNode } from "../@types";

export interface MessageConfig {
	duration?: number;
	classname?: string;
	fromStart?: boolean;
	bottom?: boolean;
	align?: "center" | "left" | "right";
	gap?: number;
	max?: number;
	offset?: string;
	closable?: boolean;
}

export interface Message {
	id?: string;
	content: TypeStringOrVNode;
	active?: boolean;
	offsetTop?: string;
	close?: () => void;
	onClose?: () => void;
	duration?: number;
	fromStart?: boolean;
	classname?: string;
	closable?: boolean;
	timer?: ReturnType<typeof setTimeout>;
	max?: number;
}
