import type { Component } from "vue";

export type TypeStringOrVNode = "string" | Component | Object | undefined;

export type InputOptionValue = string | number;

export type InputStatus = "error" | "warning" | "normal" | "success";

export type Position = "left" | "top" | "right" | "bottom";

export type FormValidator = Record<string, (value: string | number) => boolean>;

export type InputRule = {
	status?: InputStatus;
	invalid: (value: any) => false | string;
};

export type ValidState = {
	status?: InputStatus;
	message?: string;
};

export interface BaseInput extends ValidState {
	type?: string;
	label?: TypeStringOrVNode;
	name?: string;
	modelValue?: any;
	labelInline?: boolean;
	disabled?: boolean;
	allowClear?: boolean;
	placeholder?: string;
	rule?: InputRule;
	round?: boolean;
	trigger?: string;
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

export interface InputOption extends ValidState {
	label?: string;
	modelValue?: any;
	name?: string;
	disabled?: boolean;
	labelInline?: boolean;
	optionInline?: boolean;
	labelWidth?: string;
	labelAlign?: string;
	options?: Option[];
	rule?: InputRule;
}
