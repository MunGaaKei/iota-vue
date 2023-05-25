<template>
	<div
		class="i-checkbox"
		:class="{
			disabled,
		}"
		:style="checkboxStyle"
	>
		<span
			v-if="label"
			class="i-checkbox-label"
			:class="{
				'i-checkbox-label-block': !inline,
			}"
		>
			<StringOrVNode :content="label"></StringOrVNode>
		</span>

		<div
			class="flex relative"
			:class="{
				'i-checkbox-options': options,
				'flex-column': !optionInline,
				[`i-input-${status}`]: status !== 'normal',
			}"
		>
			<template v-if="options">
				<checkbox-item
					v-for="option in computedOptions"
					:key="option.value"
					:value="option.value"
					:checked="modelValue.includes(option.value)"
					:disabled="option.disabled"
					:name="name"
					:type="type"
					:round="round"
					@change="handleOptionChange($event, option)"
				>
					{{ option.label }}
				</checkbox-item>
			</template>
			<checkbox-item
				v-else
				:value="modelValue"
				:checked="modelValue"
				:name="name"
				:type="type"
				:disabled="disabled"
				:round="round"
				@change="handleChange"
			>
				<slot></slot>
			</checkbox-item>

			<span class="i-input-message">
				{{ validateState.message || message }}
			</span>
		</div>
	</div>
</template>

<script lang="ts" setup>
import useValidation from "@p/js/useValidation";
import { computed, inject, reactive, withDefaults } from "vue";
import { FormValidator, Option, ValidState } from "../@types";
import StringOrVNode from "../common/StringOrVNode.vue";
import CheckboxItem from "./checkbox-item.vue";
import "./checkbox.scss";
import { Checkbox } from "./types";

const props = withDefaults(defineProps<Checkbox>(), {
	type: "default",
	labelInline: true,
	optionInline: true,
	inline: true,
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

defineOptions({
	name: "i-checkbox",
});

const emits = defineEmits<{
	(e: "update:modelValue", v: any): void;
	(e: "invalid"): void;
}>();

const handleChange = (e: Event) => {
	const checked = (e.target as HTMLInputElement).checked;

	if (props.rule) {
		const isValid = validate?.(checked);
		isValid === false && emits("invalid");
	}

	emits("update:modelValue", checked);
};

const computedOptions = computed(() => {
	return props.options?.map((option) => {
		if (typeof option === "string" || typeof option === "number") {
			return { label: option, value: option };
		}
		return option;
	});
});

const handleOptionChange = (e: Event, option: Option) => {
	const checked = (e.target as HTMLInputElement).checked;
	const { modelValue } = props;

	if (modelValue && Array.isArray(modelValue)) {
		const i = modelValue.findIndex((value) => value === option.value);

		if (checked) {
			modelValue.push(option.value);
		} else {
			i > -1 && modelValue.splice(i, 1);
		}

		if (props.rule) {
			const isValid = validate?.(modelValue);
			isValid === false && emits("invalid");
		}

		emits("update:modelValue", modelValue);
	} else {
		if (props.rule) {
			const isValid = validate?.(checked ? [option.value] : []);
			isValid === false && emits("invalid");
		}

		emits("update:modelValue", checked ? [option.value] : []);
	}
};

const status = computed(() => {
	return props.rule ? validateState.status : props.status;
});

const checkboxStyle = computed(() => {
	return {
		"--label-width": props.labelWidth,
		"--label-align": props.labelAlign,
	};
});
</script>
