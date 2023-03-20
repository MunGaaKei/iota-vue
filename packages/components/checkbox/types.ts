interface Option {
    label: string;
    value: any;
    disabled?: boolean;
};

const option: Option = {
    label: '',
    value: 0
}

export type TypeOption = typeof option