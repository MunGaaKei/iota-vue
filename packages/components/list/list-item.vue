<template>
    <li v-if="type === 'item'" class="i-list-item">
        <labelItem v-if="label"></labelItem>
        <div class="i-list-content">
            <slot></slot>
        </div>
    </li>
    <li v-else class="i-list-title">
        <slot></slot>
    </li>
</template>

<script setup lang="ts" name="i-list-item">
import { withDefaults, h } from "vue";
import type { VNode } from "vue";

type TypeLabel = string | VNode | Object;

const props = withDefaults(
    defineProps<{
        label?: TypeLabel;
        type?: "title" | "item";
    }>(),
    {
        type: "item",
    }
);

const labelItem = (): VNode => {
    const p = {
        class: "i-list-label",
    };

    return h("div", p, props.label as VNode);
};
</script>
