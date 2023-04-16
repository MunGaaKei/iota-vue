export type InputOptionValue = string | number;

export interface InputOption {
    label: string;
    value: InputOptionValue;
    disabled?: boolean;
    checked?: boolean;
}

export interface InputPropType {
    readonly?: boolean;
    spellcheck?: boolean;
}
