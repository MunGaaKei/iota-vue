import type { Component } from "vue";

export type TypeStringOrVNode = "string" | Component | Object | undefined;

export type InputOptionValue = string | number;

export type InputStatus = "error" | "warning" | "normal" | "success";

export type Position = "left" | "top" | "right" | "bottom";

export type InputRule = {
	status?: InputStatus;
	invalid: (value: string) => false | string;
	delay?: number;
};

export interface BaseInput {
	label?: TypeStringOrVNode;
	name?: string;
	modelValue?: any;
	labelInline?: boolean;
	border?: boolean;
	status?: InputStatus;
	message?: string;
	disabled?: boolean;
	allowClear?: boolean;
	placeholder?: string;
}

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
