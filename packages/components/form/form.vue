<template>
	<form
		ref="$form"
		class="i-form"
		:class="{
			'i-form-label-inline': labelInline,
		}"
		:style="{
			'--gap': gap,
			'--label-width': labelWidth,
			'--label-align': labelAlign,
		}"
	>
		<slot></slot>
	</form>
</template>

<script setup lang="ts">
import { provide, ref } from "vue";
import { FormValidator } from "../@types";
import "./form.scss";
import type { Form } from "./types";

defineOptions({
	name: "i-form",
});

const props = withDefaults(defineProps<Form>(), {
	gap: "1em",
});
const $form = ref<HTMLFormElement>();
const validators: FormValidator = {};

const emits = defineEmits<{
	(e: "update:modelValue", v: any): void;
}>();

provide("form-validators", validators);

const validate = () => {
	const fields = Object.keys(validators);
	let isValid = true;

	for (let field of fields) {
		const validator = validators[field];
		const fieldValid = validator(props.modelValue[field]);

		if (!fieldValid) isValid = false;
	}

	return isValid;
};

defineExpose({
	$form,
	validate,
});
</script>
