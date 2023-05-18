import { TypeStringOrVNode } from "../@types";

type TypeInputStatus = "error" | "warning" | "normal" | "success";

export interface Select {
	label?: TypeStringOrVNode;
	modelValue?: any;
	labelInline?: boolean;
	options: any[];
	border?: boolean;
	status?: TypeInputStatus;
	message?: string;
	disabled?: boolean;
	allowClear?: boolean;
	chip?: boolean;
	placeholder?: string;
	wrap?: boolean;
	maxDisplay?: number;
	body?: boolean;
}
