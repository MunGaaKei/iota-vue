import type { TypeStringOrVNode } from "../@types";

export type InputStatus = "error" | "warning" | "normal" | "success";

export interface Input {
	type?: string;
	label?: TypeStringOrVNode;
	modelValue?: string;
	labelInline?: boolean;
	border?: boolean;
	status?: InputStatus;
	message?: string;
	disabled?: boolean;
	allowClear?: boolean;
	trigger?: string | string[];
	validate?: (value?: string) => boolean;
}
