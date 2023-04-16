<template>
    <div
        class="i-radio"
        :class="{
            disabled,
        }"
        :style="radioStyle"
    >
        <span
            v-if="label"
            class="i-radio-label"
            :class="{
                'i-radio-label-block': !inline,
            }"
        >
            <component :is="renderStringOrVNode(label)"></component>
        </span>

        <div
            class="flex"
            :class="{
                'i-radio-options': options,
                'flex-column': !optionInline,
            }"
        >
            <label
                v-for="option in computedOptions"
                :key="option.value"
                class="i-radio-item"
                :class="{
                    disabled,
                }"
            >
                <input
                    type="radio"
                    :value="modelValue"
                    :checked="modelValue === option.value"
                    class="i-radio-input"
                    :class="[`i-radio-${type}`]"
                    :disabled="disabled"
                    :name="name"
                    @change="handleChange($event, option)"
                />

                <span class="i-radio-text">
                    {{ option.label }}
                </span>
            </label>
        </div>
    </div>
</template>

<script setup lang="ts" name="i-radio">
import { renderStringOrVNode } from "@p/js/utils";
import { computed, withDefaults } from "vue";
import { InputOption } from "../common";
import "./radio.scss";

interface IProps {
    label?: string;
    type?: "default" | "button";
    modelValue?: any;
    options: any[];
    name?: string;
    disabled?: boolean;
    inline?: boolean;
    labelInline?: boolean;
    optionInline?: boolean;
    labelWidth?: string;
    labelAlign?: string;
}

const props = withDefaults(defineProps<IProps>(), {
    type: "default",
});

const emits = defineEmits<{
    (e: "update:modelValue", v: any): void;
}>();

const computedOptions = computed((): InputOption[] => {
    return props.options?.map((option: any) => {
        if (typeof option === "string" || typeof option === "number") {
            return { label: option, value: option };
        }
        return option;
    });
});

const handleChange = (e: Event, option: any) => {
    emits("update:modelValue", option.value);
};

const radioStyle = computed(() => {
    return {
        "--label-width": props.labelWidth,
        "--label-align": props.labelAlign,
    };
});
</script>
