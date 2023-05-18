import type { VNode } from "vue";

export interface Dialog {
	modelValue?: boolean;
	closable?: boolean;
	backdropClosable?: boolean;
	title?: string | VNode;
	width?: string;
	height?: string;
	customized?: boolean;
	header?: boolean;
	footer?: boolean;
	closeBtn?: boolean;
	cancel?: string;
	confirm?: string;
}
