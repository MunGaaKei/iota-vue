import { ExtractPropTypes } from "vue";

export type TypeMenuItem = {
    type?: string;
    title: string;
    icon?: any;
    [key: string]: any;
};

export const MenuProps = {
    items: Array<TypeMenuItem>,
};

export type MenuTypes = ExtractPropTypes<typeof MenuProps>;
