export type ContainerLayout = "default" | "menu";

export interface Container {
	layout?: ContainerLayout;
	modelValue?: boolean;
	breakpoint?: string | boolean;
	contentClass?: string | Object;
	siderClass?: string | Object;
	footerClass?: string | Object;
	headerClass?: string | Object;
}
