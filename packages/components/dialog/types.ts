export interface Dialog {
	modelValue: boolean;
	closable?: boolean;
	backdropClosable?: boolean;
	customized?: boolean;
	header?: boolean;
	footer?: boolean;
	closeButton?: boolean;
	cancel?: string;
	confirm?: string;
}
