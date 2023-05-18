import type { Component } from "vue";

export type TypeStringOrVNode = "string" | Component | Object | undefined;

export type InputOptionValue = string | number;

export type Position = "left" | "top" | "right" | "bottom";

export interface Option {
	label: TypeStringOrVNode;
	value: InputOptionValue;
	disabled?: boolean;
	checked?: boolean;
}

export interface InputPropType {
	readonly?: boolean;
	spellcheck?: boolean;
}

export interface InputOption {
	label?: string;
	modelValue?: any;
	name?: string;
	round?: boolean;
	disabled?: boolean;
	inline?: boolean;
	labelInline?: boolean;
	optionInline?: boolean;
	labelWidth?: string;
	labelAlign?: string;
	options?: Option[];
}
