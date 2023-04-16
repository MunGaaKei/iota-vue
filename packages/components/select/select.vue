<template>
    <i-popup
        ref="$popup"
        touchable
        trigger="click"
        position="bottom"
        :gap="0"
        :body="body"
        :disabled="disabled"
    >
        <template #trigger>
            <label
                ref="$label"
                class="i-select-label"
                :class="{
                    'i-input-inline': labelInline,
                }"
            >
                <span v-if="label" class="i-input-label-text">
                    <component :is="renderStringOrVNode(label)"></component>
                </span>

                <input
                    type="hidden"
                    ref="$input"
                    :value="modelValue"
                    :disabled="disabled"
                />

                <div
                    class="i-input-item"
                    :class="{
                        [`i-input-${status}`]: status !== 'normal',
                    }"
                >
                    <slot name="prefix"></slot>

                    <div
                        class="i-select"
                        :class="{
                            'i-select-chips': chip,
                            'i-select-wrap': wrap,
                            disabled,
                        }"
                    >
                        <template v-if="multiple">
                            <span
                                v-for="(option, index) in activeOptions.slice(
                                    0,
                                    maxDisplayCount
                                )"
                                :key="index"
                                class="i-select-value"
                                :class="{
                                    'i-select-value-chip': chip,
                                }"
                                @click.stop="chip && handleSelectOption(option)"
                            >
                                {{ option.label }}
                            </span>

                            <span
                                v-if="chip && rest > 0"
                                class="chip i-select-value-rest"
                            >
                                +{{ rest }}
                            </span>
                        </template>
                        <span v-else class="i-select-value">
                            {{ activeOption?.label }}
                        </span>

                        <span
                            v-if="modelValue === '' || !modelValue.length"
                            class="i-select-holder"
                        >
                            {{ placeholder }}
                        </span>
                    </div>

                    <ClearRound
                        v-if="allowClear"
                        class="i-input-clear"
                        :class="{
                            active: modelValue?.length,
                        }"
                        @click="emits('update:modelValue', multiple ? [] : '')"
                    />

                    <UnfoldMoreRound class="i-select-caret" />

                    <span class="i-input-message">{{ message }}</span>
                    <slot name="suffix"></slot>
                </div>
            </label>
        </template>

        <i-list
            type="option"
            class="i-select-options bg-blur"
            :style="optionsStyle"
        >
            <i-list-item
                v-for="option in computedOptions"
                :key="option.value"
                class="i-select-option"
                :class="{
                    active: isOptionActive(option.value),
                    disabled: option.disabled,
                }"
                @click="handleSelectOption(option)"
            >
                <span class="i-select-value" :title="option.label">
                    {{ option.label }}
                </span>
            </i-list-item>
        </i-list>
    </i-popup>
</template>

<script setup lang="ts" name="i-select">
import { renderStringOrVNode } from "@p/js/utils";
import { ClearRound, UnfoldMoreRound } from "@vicons/material";
import { VNode, computed, ref, withDefaults } from "vue";
import { iList, iListItem, iPopup } from "..";
import { InputOption, InputOptionValue } from "../common";
import "./select.scss";

type TypeInputStatus = "error" | "warning" | "normal" | "success";
interface IProps {
    label?: VNode | string;
    modelValue?: any;
    labelInline?: boolean;
    options: any[];
    border?: boolean;
    status?: TypeInputStatus;
    message?: string;
    disabled?: boolean;
    allowClear?: boolean;
    chip?: boolean;
    placeholder?: string;
    wrap?: boolean;
    maxDisplay?: number;
    body?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
    status: "normal",
    allowClear: true,
});

const $input = ref<HTMLInputElement>();
const $label = ref<HTMLLabelElement>();
const $popup = ref();
const rest = ref<number>(0);

const computedOptions = computed((): InputOption[] => {
    return props.options?.map((option: any) => {
        if (typeof option === "string" || typeof option === "number") {
            return { label: option, value: option };
        }
        return option;
    });
});

const multiple = computed(() => {
    return Array.isArray(props.modelValue);
});

const isOptionActive = (value: InputOptionValue) => {
    return multiple.value
        ? props.modelValue.includes(value)
        : props.modelValue === value;
};

const activeOptions = computed(() => {
    const options = computedOptions.value.filter((option: InputOption) => {
        return multiple ? props.modelValue.includes(option.value) : [option];
    });

    return options;
});

const activeOption = computed(() => {
    return computedOptions.value.find(
        (option: InputOption) => option.value === props.modelValue
    );
});

const maxDisplayCount = computed(() => {
    const l = props.modelValue.length;
    if (multiple.value && props.maxDisplay) {
        rest.value = l - props.maxDisplay;
        return props.maxDisplay;
    }

    return l;
});

const emits = defineEmits<{
    (e: "update:modelValue", v: any): void;
    (e: "select", v: InputOption): void;
}>();

const handleSelectOption = (option: InputOption) => {
    if (option.disabled) return;

    emits("select", option);

    if (multiple.value) {
        const { modelValue } = props;
        const i = modelValue.findIndex(
            (value: InputOptionValue) => value === option.value
        );

        if (i > -1) {
            modelValue.splice(i, 1);
        } else {
            modelValue.push(option.value);
        }

        emits("update:modelValue", modelValue);
    } else {
        emits("update:modelValue", option.value);
        $popup.value.toggle(false);
    }
};

const optionsStyle = computed(() => {
    return {
        width: `${$label.value?.offsetWidth}px`,
    };
});

defineExpose({
    $input: $input.value,
});
</script>
