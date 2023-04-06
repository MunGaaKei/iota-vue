<template>
    <label
        class="i-input-label"
        :class="{
            'i-input-inline': labelInline,
        }"
    >
        <span v-if="label" className="i-input-label-text">
            <component :is="renderStringOrVNode(label)"></component>
        </span>

        <div
            class="i-input-item"
            :class="{
                [`i-input-${status}`]: status !== 'normal',
            }"
        >
            <slot name="prefix"></slot>
            <input :type="type" ref="input" className="i-input" />
            <span className="i-input-message">{{ message }}</span>
            <slot name="suffix"></slot>
        </div>
    </label>
</template>

<script lang="ts" setup name="i-input">
import { renderStringOrVNode } from "@p/js/utils";
import { VNode, defineExpose, ref, withDefaults } from "vue";
import "./input.scss";

export type TypeInputStatus = "error" | "warning" | "normal" | "success";
export type IProps = {
    type?: string;
    label?: VNode | string;
    value?: string;
    labelInline?: boolean;
    border?: boolean;
    className?: string;
    status?: TypeInputStatus;
    message?: string;
    onEnter?: Function;
};

const props = withDefaults(defineProps<IProps>(), {
    status: "normal",
    type: "text",
});

const $input = ref<HTMLInputElement>();

defineExpose({
    $input: $input.value,
});
</script>
