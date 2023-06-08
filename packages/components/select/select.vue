<template>
	<i-popup
		ref="$popup"
		touchable
		trigger="click"
		position="bottom"
		:gap="0"
		:disabled="disabled"
		@show="emits('show')"
		@hide="emits('hide')"
	>
		<template #trigger>
			<label
				class="i-select-label"
				:class="{
					'i-input-inline': labelInline,
				}"
				v-bind="$attrs"
			>
				<span v-if="label" class="i-input-label-text">
					<StringOrVNode :content="label"></StringOrVNode>
				</span>

				<input
					type="hidden"
					ref="$input"
					:name="name"
					:value="modelValue"
					:disabled="disabled"
				/>

				<div
					ref="$target"
					class="i-input-item i-popup-target"
					:class="{
						[`i-input-${status}`]: status !== 'normal',
						rounded: round,
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
								@click="
									chip && handleSelectOption($event, option)
								"
							>
								{{ option.label }}
							</span>

							<span
								v-if="rest > 0"
								class="chip i-select-value-rest"
							>
								+{{ rest }}
							</span>
						</template>
						<span v-else class="i-select-value">
							{{ activeOption?.label }}
						</span>

						<span class="i-select-holder">
							<template v-if="multiple && !modelValue.length">
								{{ placeholder }}
							</template>
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

					<span class="i-input-message">
						{{ validateState.message || message }}
					</span>
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
				@click="handleSelectOption($event, option)"
			>
				<StringOrVNode :content="option.label"></StringOrVNode>
			</i-list-item>
		</i-list>
	</i-popup>
</template>

<script setup lang="ts">
import { iList, iListItem, iPopup } from "@p/index";
import useValidation from "@p/js/useValidation";
import { ClearRound, UnfoldMoreRound } from "@vicons/material";
import { computed, inject, reactive, ref, withDefaults } from "vue";
import { FormValidator, InputOptionValue, Option, ValidState } from "../@types";
import StringOrVNode from "../common/StringOrVNode.vue";
import "./select.scss";
import type { Select } from "./types";

defineOptions({
	name: "i-select",
});

const props = withDefaults(defineProps<Select>(), {
	status: "normal",
});

const $input = ref<HTMLInputElement>();
const $target = ref<HTMLLabelElement>();
const $popup = ref();
const rest = ref<number>(0);
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

const computedOptions = computed((): Option[] => {
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
	const options = computedOptions.value.filter((option: Option) => {
		return multiple ? props.modelValue.includes(option.value) : [option];
	});

	return options;
});

const activeOption = computed(() => {
	return computedOptions.value.find(
		(option) => option.value === props.modelValue
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

const status = computed(() => {
	return props.rule ? validateState.status : props.status;
});

const emits = defineEmits<{
	(e: "update:modelValue", v: any): void;
	(e: "select", v: Option): void;
	(e: "invalid"): boolean;
	(e: "show"): void;
	(e: "hide"): void;
}>();

const handleSelectOption = (e: Event, option: Option) => {
	if (option.disabled) return;
	if (props.chip) e.stopPropagation();

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

		if (props.rule) {
			const isValid = validate?.(modelValue);
			isValid === false && emits("invalid");
		}

		emits("update:modelValue", modelValue);
	} else {
		if (props.rule) {
			const isValid = validate?.(option.value);
			isValid === false && emits("invalid");
		}

		emits("update:modelValue", option.value);
		$popup.value.toggle(false);
	}
};

const optionsStyle = computed(() => {
	return {
		width: `${$target.value?.offsetWidth}px`,
	};
});

defineExpose({
	$input: $input.value,
});
</script>
