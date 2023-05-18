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
				'i-radio-label-block': !inline,
			}"
		>
			<StringOrVNode :content="label"></StringOrVNode>
		</span>

		<div
			class="flex"
			:class="{
				'i-radio-options': options,
				'flex-column': !optionInline,
			}"
		>
			<label
				v-for="option in computedOptions"
				:key="option.value"
				class="i-radio-item"
				:class="{
					disabled,
				}"
			>
				<input
					type="radio"
					:value="modelValue"
					:checked="modelValue === option.value"
					class="i-radio-input"
					:class="[`i-radio-${type}`]"
					:disabled="disabled"
					:name="name"
					@change="handleChange($event, option)"
				/>

				<span class="i-radio-text">
					{{ option.label }}
				</span>
			</label>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, withDefaults } from "vue";
import type { Option } from "../@types";
import type { Radio } from "./types";

import StringOrVNode from "../common/StringOrVNode.vue";
import "./radio.scss";

defineOptions({
	name: "i-radio",
});

const props = withDefaults(defineProps<Radio>(), {
	type: "default",
});

const emits = defineEmits<{
	(e: "update:modelValue", v: any): void;
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
	emits("update:modelValue", option.value);
};

const radioStyle = computed(() => {
	return {
		"--label-width": props.labelWidth,
		"--label-align": props.labelAlign,
	};
});
</script>
