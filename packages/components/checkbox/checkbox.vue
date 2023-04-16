<template>
    <div
        class="i-checkbox"
        :class="{
            disabled,
        }"
        :style="checkboxStyle"
    >
        <span
            v-if="label"
            class="i-checkbox-label"
            :class="{
                'i-checkbox-label-block': !inline,
            }"
        >
            <component :is="renderStringOrVNode(label)"></component>
        </span>

        <div
            class="flex"
            :class="{
                'i-checkbox-options': options,
                'flex-column': !optionInline,
            }"
        >
            <template v-if="options">
                <checkbox-item
                    v-for="option in computedOptions"
                    :key="option.value"
                    :value="option.value"
                    :checked="modelValue.includes(option.value)"
                    :disabled="option.disabled"
                    :name="name"
                    :type="type"
                    :round="round"
                    @change="handleOptionChange($event, option)"
                >
                    {{ option.label }}
                </checkbox-item>
            </template>
            <checkbox-item
                v-else
                :value="modelValue"
                :checked="modelValue"
                :name="name"
                :type="type"
                :disabled="disabled"
                :round="round"
                @change="handleChange"
            >
                <slot></slot>
            </checkbox-item>
        </div>
    </div>
</template>

<script lang="ts" setup name="i-checkbox">
import { renderStringOrVNode } from "@p/js/utils";
import { computed, withDefaults } from "vue";
import { InputOption } from "../common";
import CheckboxItem from "./checkbox-item.vue";
import "./checkbox.scss";

interface IProps {
    label?: string;
    type?: "default" | "switch" | "button";
    modelValue?: any;
    name?: string;
    round?: boolean;
    disabled?: boolean;
    inline?: boolean;
    labelInline?: boolean;
    optionInline?: boolean;
    labelWidth?: string;
    labelAlign?: string;
    options?: InputOption[];
}

const props = withDefaults(defineProps<IProps>(), {
    type: "default",
    labelInline: true,
    optionInline: true,
    inline: true,
});

const emits = defineEmits<{
    (e: "update:modelValue", v: any): void;
}>();

const handleChange = (e: Event) => {
    emits("update:modelValue", (e.target as HTMLInputElement).checked);
};

const computedOptions = computed(() => {
    return props.options?.map((option: InputOption) => {
        if (typeof option === "string" || typeof option === "number") {
            return { label: option, value: option };
        }
        return option;
    });
});

const handleOptionChange = (e: Event, option: any) => {
    const checked = (e.target as HTMLInputElement).checked;
    const { modelValue } = props;

    if (modelValue && Array.isArray(modelValue)) {
        const i = modelValue.findIndex((value) => value === option.value);

        if (checked) {
            modelValue.push(option.value);
        } else {
            i > -1 && modelValue.splice(i, 1);
        }

        emits("update:modelValue", modelValue);
    } else {
        emits("update:modelValue", checked ? [option.value] : []);
    }
};

const checkboxStyle = computed(() => {
    return {
        "--label-width": props.labelWidth,
        "--label-align": props.labelAlign,
    };
});
</script>
