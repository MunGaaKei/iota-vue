<template>
    <label
        class="i-input-label"
        :class="{
            'i-input-inline': labelInline,
        }"
    >
        <span v-if="label" class="i-input-label-text">
            <component :is="renderStringOrVNode(label)"></component>
        </span>

        <div
            class="i-input-item"
            :class="{
                [`i-input-${status}`]: status !== 'normal',
            }"
        >
            <slot name="prefix"></slot>
            <input
                :type="type"
                ref="input"
                class="i-input"
                :value="modelValue"
                :disabled="disabled"
                @input="handleUpdateValue"
                v-bind="$attrs"
            />

            <ClearRound
                v-if="allowClear"
                class="i-input-clear"
                :class="{
                    active: modelValue !== '',
                }"
                @click="emits('update:modelValue', '')"
            ></ClearRound>
            <span class="i-input-message">{{ message }}</span>
            <slot name="suffix"></slot>
        </div>
    </label>
</template>

<script lang="ts" setup name="i-input">
import { renderStringOrVNode } from "@p/js/utils";
import { ClearRound } from "@vicons/material";
import { VNode, defineEmits, defineExpose, ref, withDefaults } from "vue";
import "./input.scss";

export type TypeInputStatus = "error" | "warning" | "normal" | "success";
export type IProps = {
    type?: string;
    label?: VNode | string;
    modelValue?: string;
    labelInline?: boolean;
    border?: boolean;
    status?: TypeInputStatus;
    message?: string;
    disabled?: boolean;
    allowClear?: boolean;
};

withDefaults(defineProps<IProps>(), {
    status: "normal",
    type: "text",
});

const $input = ref<HTMLInputElement>();

const emits = defineEmits<{
    (e: "update:modelValue", v: string): void;
}>();

const handleUpdateValue = (e: Event) => {
    emits("update:modelValue", (e.target as HTMLInputElement).value);
};

defineExpose({
    $input: $input.value,
});
</script>
