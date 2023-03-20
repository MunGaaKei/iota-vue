import { VNode } from 'vue';

export type TypeMessageConfig = {
	duration?: number;
	closable?: boolean;
	classname?: string;
	fromStart?: boolean;
	bottom?: boolean;
	align?: 'center' | 'left' | 'right';
	gap?: number;
	max?: number;
	offset?: string;
};

export type TypeMessage = {
	id?: string;
	content: string | VNode;
	active?: boolean;
	offsetTop?: string;
	close?: Function;
	onClose?: Function;
	duration?: number;
	fromStart?: boolean;
	classname?: string;
	closable?: boolean;
	timer?: ReturnType<typeof setTimeout>;
};
