<template>
    <label
        class="i-checkbox-item"
        :class="{
            disabled,
        }"
    >
        <input
            type="checkbox"
            :value="modelValue"
            :checked="checked"
            class="i-checkbox-input"
            :class="[
                `i-checkbox-${type}`,
                {
                    rounded: round,
                },
            ]"
            :disabled="disabled"
            :name="name"
            @change="handleChange"
        />

        <span class="i-checkbox-text">
            <slot></slot>
        </span>
    </label>
</template>

<script lang="ts" setup name="i-checkbox-item">
import { withDefaults } from "vue";

withDefaults(
    defineProps<{
        type?: "default" | "switch" | "button";
        modelValue?: boolean;
        checked?: boolean;
        name?: string;
        round?: boolean;
        disabled?: boolean;
    }>(),
    {
        type: "default",
    }
);

const emits = defineEmits<{
    (e: "update:modelValue", v: boolean): void;
}>();

const handleChange = (e: Event) => {
    emits("update:modelValue", (e.target as HTMLInputElement).checked);
};
</script>
