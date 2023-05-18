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
			<input
				:type="type"
				ref="input"
				class="i-input"
				:value="modelValue"
				:disabled="disabled"
				@input="handleUpdateValue"
				v-bind="$attrs"
			/>

			<ClearRound
				v-if="allowClear"
				class="i-input-clear"
				:class="{
					active: modelValue !== '',
				}"
				@click="emits('update:modelValue', '')"
			></ClearRound>
			<span class="i-input-message">{{ message }}</span>
			<slot name="suffix"></slot>
		</div>
	</label>
</template>

<script lang="ts" setup>
import { ClearRound } from "@vicons/material";
import { ref, withDefaults } from "vue";
import StringOrVNode from "../common/StringOrVNode.vue";
import "./input.scss";
import type { Input } from "./types";

defineOptions({
	name: "i-input",
});

withDefaults(defineProps<Input>(), {
	status: "normal",
	type: "text",
});

const $input = ref<HTMLInputElement>();

const emits = defineEmits<{
	(e: "update:modelValue", v: string): void;
}>();

const handleUpdateValue = (e: Event) => {
	emits("update:modelValue", (e.target as HTMLInputElement).value);
};

defineExpose({
	$input: $input.value,
});
</script>
