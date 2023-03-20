<template>
    <label
        class="i-checkbox-item"
        :class="{
            disabled,
        }"
    >
        <input
            type="checkbox"
            v-model="value"
            class="i-checkbox-input"
            :class="[
                `i-checkbox-${type}`,
                {
                    rounded: round,
                },
            ]"
            :disabled="disabled"
            :name="name"
            :value="optionValue"
            @change="handleChange"
        />

        <span class="i-checkbox-text">
            <slot></slot>
        </span>
    </label>
</template>

<script lang="ts" setup name="i-checkbox-item">
import { useState } from "@p/js/useState";
import { withDefaults, watch } from "vue";

const props = withDefaults(
    defineProps<{
        type?: "default" | "switch" | "button";
        modelValue?: any;
        name?: string;
        round?: boolean;
        disabled?: boolean;
        optionValue?: any;
    }>(),
    {
        type: "default",
    }
);

watch(
    () => props.modelValue,
    (newValue) => setValue(newValue)
);

const [value, setValue] = useState<any>(props.modelValue);

const emits = defineEmits<{
    (e: "update:modelValue", v: any): void;
    (e: "change", v: any): void;
}>();

const handleChange = () => {
    if (props.disabled) return;

    emits("update:modelValue", value.value);
    emits("change", value.value);
};
</script>
