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
			}"
		>
			<slot name="prefix"></slot>
			<textarea
				:type="type"
				:name="name"
				ref="$textarea"
				class="i-textarea"
				:value="modelValue"
				:disabled="disabled"
				v-bind="$attrs"
				@input="handleTrigger($event, 'input')"
				@change="handleTrigger($event, 'change')"
				@focus="handleTrigger($event, 'focus')"
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
			<span class="i-input-message">{{
				validateState.message || message
			}}</span>
			<slot name="suffix"></slot>
		</div>
	</label>
</template>

<script lang="ts" setup>
import { ClearRound } from "@vicons/material";
import { computed, reactive, ref, withDefaults } from "vue";
import { InputStatus } from "../@types";
import StringOrVNode from "../common/StringOrVNode.vue";
import "./input.scss";
import type { Textarea } from "./types";

defineOptions({
	name: "i-textarea",
});

type Trigger = "change" | "input" | "focus" | "blur";
type ValidState = {
	status: InputStatus;
	message?: string;
};

const props = withDefaults(defineProps<Textarea>(), {
	status: "normal",
	type: "text",
	trigger: "change",
});

const $textarea = ref<HTMLInputElement>();
const validateState = reactive<ValidState>(initValidState());

const emits = defineEmits<{
	(e: "update:modelValue", v: string): void;
	(e: "invalid"): void;
}>();

let validateTimer: ReturnType<typeof setTimeout> | undefined;

const handleTrigger = (e: Event, evt: Trigger) => {
	const value = (e.target as HTMLInputElement).value;

	handleValidate(value, evt);

	if (evt === "input") {
		Object.assign(validateState, initValidState());
		emits("update:modelValue", value);
	}
};

const handleValidate = (value: string, evt: Trigger) => {
	if (!props.rule || props.trigger !== evt) return;

	const { invalid, status = "error", delay = 100 } = props.rule;

	if (delay) {
		validateTimer && clearTimeout(validateTimer);
		validateTimer = setTimeout(() => {
			const isInvalid = invalid(value);

			validateState.status = isInvalid ? status : "normal";
			validateState.message = isInvalid ? isInvalid : props.message;
			isInvalid && emits("invalid");

			validateTimer && clearTimeout(validateTimer);
		}, delay);

		return;
	}

	const isInvalid = invalid(value);

	validateState.status = isInvalid ? status : "normal";
	validateState.message = isInvalid ? isInvalid : props.message;
	isInvalid && emits("invalid");
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
	$textarea: $textarea.value,
});
</script>
