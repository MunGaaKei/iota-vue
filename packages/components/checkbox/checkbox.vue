<template>
	<div
		class="i-checkbox"
		:class="{
			disabled
		}"
		:style="checkboxStyle"
	>
		<span
			v-if="label"
			class="i-checkbox-label"
			:class="{
				'i-checkbox-label-block': !inline
			}"
		>
			{{ label }}
		</span>

		<div
			class="flex"
			:class="{
				'i-checkbox-options': options,
				'flex-column': !optionInline
			}"
		>
			<template v-if="options">
				<checkbox-item
					v-for="(option, index) in options"
					:key="index"
					v-model="value"
					:disabled="option.disabled"
					:name="name"
					:type="type"
					:round="round"
					:option-value="option.value"
					@change="handleChange"
				>
					{{ option.label }}
				</checkbox-item>
			</template>
			<checkbox-item
				v-else
				v-model="value"
				:name="name"
				:type="type"
				:disabled="disabled"
				:round="round"
				@change="handleChange"
			>
				<slot></slot>
			</checkbox-item>
		</div>
	</div>
</template>

<script lang="ts" setup name="i-checkbox">
import CheckboxItem from './checkbox-item.vue';
import { withDefaults, computed, watch } from 'vue';
import { TypeOption } from './types';
import { useState } from '@p/js/useState';
import './checkbox.scss';

const props = withDefaults(
	defineProps<{
		label?: string;
		type?: 'default' | 'switch' | 'button';
		modelValue?: any;
		name?: string;
		round?: boolean;
		disabled?: boolean;
		inline?: boolean;
		labelInline?: boolean;
		optionInline?: boolean;
		labelWidth?: string;
		options?: TypeOption[];
	}>(),
	{
		type: 'default',
		labelInline: true,
		optionInline: true,
		inline: true
	}
);

const [value, setValue] = useState<any>(props.modelValue);

watch(
	() => props.modelValue,
	(newValue) => setValue(newValue)
);

const emits = defineEmits<{
	(e: 'update:modelValue', v: any): void;
	(e: 'change', v: any): void;
}>();

const handleChange = (newValue: any) => {
	emits('update:modelValue', newValue);
	emits('change', newValue);
};

const checkboxStyle = computed(() => {
	return {
		'--label-width': props.labelWidth
	};
});
</script>
