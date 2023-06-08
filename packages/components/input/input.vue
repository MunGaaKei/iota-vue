<template>
	<label
		class="i-input-label"
		:class="{
			'i-input-inline': labelInline,
		}"
	>
		<span v-if="label" class="i-input-label-text">
			<StringOrVNode :content="label"></StringOrVNode>
		</span>

		<div
			class="i-input-item"
			:class="{
				[`i-input-${status}`]: status !== 'normal',
				rounded: round,
			}"
		>
			<slot name="prefix"></slot>
			<input
				ref="$input"
				:type="type"
				class="i-input"
				:value="modelValue"
				:disabled="disabled"
				v-bind="$attrs"
				@input="handleTrigger($event, 'input')"
				@change="handleTrigger($event, 'change')"
				@blur="handleTrigger($event, 'blur')"
			/>

			<ClearRound
				v-if="allowClear"
				class="i-input-clear"
				:class="{
					active: modelValue !== '',
				}"
				@click="emits('update:modelValue', '')"
			></ClearRound>

			<div v-if="type === 'number'" class="flex flex-column my-auto mx-4">
				<AddRound
					class="i-input-plus"
					@click.prevent="computeValue(true)"
				></AddRound>
				<MinusRound
					class="i-input-minus"
					@click.prevent="computeValue(false)"
				></MinusRound>
			</div>

			<span class="i-input-message">
				{{ validateState.message || message }}
			</span>

			<slot name="suffix"></slot>
		</div>
	</label>
</template>

<script lang="ts" setup>
import useValidation from "@p/js/useValidation";
import { AddRound, ClearRound, MinusRound } from "@vicons/material";
import { computed, inject, reactive, ref, withDefaults } from "vue";
import { FormValidator, ValidState } from "../@types";
import StringOrVNode from "../common/StringOrVNode.vue";
import "./input.scss";
import type { Input } from "./types";

defineOptions({
	name: "i-input",
});

type Trigger = "change" | "input" | "blur";

const props = withDefaults(defineProps<Input>(), {
	status: "normal",
	type: "text",
	trigger: "change",
	step: 1,
});

const $input = ref<HTMLInputElement>();
const validateState = reactive<ValidState>(initValidState());
const formValidators = inject<FormValidator>("form-validators", {});

const emits = defineEmits<{
	(e: "update:modelValue", v: string | number): void;
	(e: "invalid"): void;
}>();

const validate = useValidation({
	rule: props.rule,
	message: props.message,
	state: validateState,
});

if (props.name && formValidators && validate) {
	formValidators[props.name] = validate;
}

const handleTrigger = (e: Event, evt: Trigger) => {
	const { type, trigger } = props;
	let value: number | string = (e.target as HTMLInputElement).value;

	if (trigger === evt) {
		const isValid = validate?.(value);
		isValid === false && emits("invalid");
	}

	if (type === "number") {
		value = valueInRange(+value);
	}

	if (evt === "input") {
		Object.assign(validateState, initValidState());
		emits("update:modelValue", value);
	}
};

const computeValue = (isPlus: boolean) => {
	const { modelValue, step } = props;
	let value = modelValue;

	if (isPlus) {
		value = valueInRange(value + step);
	} else {
		value = valueInRange(value - step);
	}

	emits("update:modelValue", value);
};

const valueInRange = (value: number) => {
	const { min, max } = props;

	if (max !== undefined) value = Math.min(max, value);
	if (min !== undefined) value = Math.max(min, value);

	return value;
};

const status = computed(() => {
	return props.rule ? validateState.status : props.status;
});

function initValidState(): ValidState {
	return {
		status: "normal",
		message: "",
	};
}

defineExpose({
	$input: $input.value,
});
</script>
