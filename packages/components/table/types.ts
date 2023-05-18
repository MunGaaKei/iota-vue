export interface Table {
	type?: string;
	columns?: any[];
	header?: boolean;
	data: any[];
	loading?: boolean;
	width?: string;
	maxHeight?: string;
}
