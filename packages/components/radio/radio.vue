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
				'i-radio-label-block': !labelInline,
			}"
		>
			<StringOrVNode :content="label"></StringOrVNode>
		</span>

		<div
			class="flex"
			:class="{
				'i-radio-options': options,
				'flex-column': !optionInline,
				[`i-input-${status}`]: status !== 'normal',
			}"
		>
			<label
				v-for="option in computedOptions"
				:key="option.value"
				class="i-radio-item"
				:class="{
					disabled: disabled || option.disabled,
				}"
			>
				<input
					type="radio"
					:value="modelValue"
					:checked="modelValue === option.value"
					class="i-radio-input"
					:class="[`i-radio-${type}`]"
					:disabled="disabled || option.disabled"
					:name="name"
					@change="handleChange($event, option)"
				/>

				<span class="i-radio-text" :class="{ rounded: round }">
					{{ option.label }}
				</span>
			</label>

			<span class="i-input-message">
				{{ validateState.message || message }}
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import useValidation from "@p/js/useValidation";
import { computed, inject, reactive, withDefaults } from "vue";
import type { FormValidator, Option, ValidState } from "../@types";
import StringOrVNode from "../common/StringOrVNode.vue";
import "./radio.scss";
import type { Radio } from "./types";

defineOptions({
	name: "i-radio",
});

const props = withDefaults(defineProps<Radio>(), {
	type: "default",
});
const formValidators = inject<FormValidator>("form-validators", {});
const validateState = reactive<ValidState>({
	status: "normal",
	message: "",
});

const validate = useValidation({
	rule: props.rule,
	message: props.message,
	state: validateState,
});

if (props.name && formValidators && validate) {
	formValidators[props.name] = validate;
}

const emits = defineEmits<{
	(e: "update:modelValue", v: any): void;
	(e: "invalid"): void;
}>();

const computedOptions = computed(() => {
	return props.options?.map((option) => {
		if (typeof option === "string" || typeof option === "number") {
			return { label: option, value: option };
		}
		return option;
	});
});

const handleChange = (e: Event, option: Option) => {
	if (props.rule) {
		const isValid = validate?.(option.value);
		isValid === false && emits("invalid");
	}

	emits("update:modelValue", option.value);
};

const status = computed(() => {
	return props.rule ? validateState.status : props.status;
});

const radioStyle = computed(() => {
	return {
		"--label-width": props.labelWidth,
		"--label-align": props.labelAlign,
	};
});
</script>
