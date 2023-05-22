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
import { ref, withDefaults } from "vue";
import "./form.scss";
import type { Form } from "./types";

defineOptions({
	name: "i-form",
});

const props = withDefaults(defineProps<Form>(), {
	gap: "1em",
});
const $form = ref<HTMLFormElement>();
const emits = defineEmits<{
	(e: "update:modelValue", v: any): void;
}>();

const validate = () => {
	return true;
};

const reset = () => {
	$form.value?.reset();
};

defineExpose({
	$form,
	validate,
	reset,
});
</script>
