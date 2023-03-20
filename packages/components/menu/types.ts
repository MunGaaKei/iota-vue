import { ExtractPropTypes, VNode } from "vue";
import type { Component } from "vue";


export type TypeMenuItem = {
    type?: string,
    title: string,
    icon?: any,
    value?: any,
    [key: string]: any
}

export const MenuProps = {
    items: Array<TypeMenuItem>
}

export type MenuTypes = ExtractPropTypes<typeof MenuProps>