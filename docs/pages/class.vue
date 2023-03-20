<template>
    <h3 class="mb-12">边距</h3>
    <p>
        使用方式：<code>.[type]-[n]</code>，如<code> .pd-12</code>
        表示内边距<code>padding: 12px</code>。
    </p>
    <i-list class="my-20" label-width="40px">
        <i-list-item type="title">
            <code>[type]</code>
        </i-list-item>
        <i-list-item v-for="type in types" :key="type.key" :label="type.key">
            <code>{{ type.value }}</code>
        </i-list-item>

        <i-list-item type="title" class="mt-40">
            <code>[n]</code>
        </i-list-item>
        <i-list-item label="[n]">
            单位 <code>px</code>，可选值有
            <code v-for="n in ns" :key="n">{{ n }}</code>
        </i-list-item>
        <i-list-item label="auto">
            当 <code>type</code> 为
            <code>margin</code> 时，<code>n</code>的值还可以为<code>auto</code>
        </i-list-item>
    </i-list>

    <h3 class="mt-80">布局相关</h3>
    <i-list class="my-20" label-width="180px" style="font-family: monospace">
        <i-list-item :label="keyword('.flex')">display: flex;</i-list-item>
        <i-list-item :label="keyword('.flex-column')"
            >flex-direction: column;</i-list-item
        >
        <i-list-item :label="keyword('.sticky')">
            <p>position: sticky;</p>
            <p>top: 0;</p>
        </i-list-item>
        <i-list-item :label="keyword('.text-center')"
            >text-align: center;</i-list-item
        >
        <i-list-item :label="keyword('.justify-center')"
            >justify-content: center;</i-list-item
        >
        <i-list-item :label="keyword('.justify-evenly')"
            >justify-content: evenly;</i-list-item
        >
        <i-list-item :label="keyword('.justify-between')"
            >justify-content: between;</i-list-item
        >
        <i-list-item :label="keyword('.align-center')"
            >align-items: center;</i-list-item
        >
        <i-list-item :label="keyword('.w-100')">width: 100%;</i-list-item>
        <i-list-item :label="keyword('.h-100')">height: 100%;</i-list-item>
    </i-list>

    <h3 class="mt-80">显示相关</h3>
    <i-list class="my-20" label-width="180px" style="font-family: monospace">
        <i-list-item :label="keyword('.rounded')">
            border-radius: 200px;
        </i-list-item>
        <i-list-item :label="keyword('.rounded-slight')">
            border-radius: var(--radius);
        </i-list-item>
        <i-list-item :label="keyword('.disabled')">
            <p>opacity: .4;</p>
            <p>cursor: not-allowed;</p>
        </i-list-item>
        <i-list-item :label="keyword('.hidden')">
            display: none !important;
        </i-list-item>
        <i-list-item :label="keyword('.mobile')">
            在小屏幕显示，大屏幕隐藏，临界值为
            <code>--breakpoint: 980px</code>
        </i-list-item>
        <i-list-item :label="keyword('.hidden-mobile')">
            在小屏幕隐藏，大屏幕显示
        </i-list-item>
    </i-list>
</template>

<script lang="ts" setup>
import { h, VNode } from "vue";
import { iList, iListItem } from "@p/components";

const types = [
    {
        key: "mg",
        value: "margin",
    },
    {
        key: "mx",
        value: "margin-inline (margin-left & margin-right)",
    },
    {
        key: "my",
        value: "margin-block (margin-top & margin-bottom)",
    },
    {
        key: "ml",
        value: "margin-left",
    },
    {
        key: "mr",
        value: "margin-right",
    },
    {
        key: "mt",
        value: "margin-top",
    },
    {
        key: "mb",
        value: "margin-bottom",
    },
    {
        key: "pd",
        value: "padding",
    },
    {
        key: "px",
        value: "padding-inline (padding-left & padding-right)",
    },
    {
        key: "py",
        value: "padding-block (padding-top & padding-bottom)",
    },
    {
        key: "pl",
        value: "padding-left",
    },
    {
        key: "pr",
        value: "padding-right",
    },
    {
        key: "pt",
        value: "padding-top",
    },
    {
        key: "pb",
        value: "padding-bottom",
    },
];
const ns = [4, 8, 12, 16, 20, 24, 32, 40, 60, 80, 120];

const keyword = (text: string): VNode => {
    return h("code", text);
};
</script>
