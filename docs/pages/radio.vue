<template>
	<h3 class="mb-12">使用</h3>
	<Demo :html="html" :js="js">
		<i-radio
			label="单选框"
			v-model="model"
			:options="options"
			:type="config.type as RadioType"
			:option-inline="config.optionInline"
			:label-inline="config.labelInline"
			:disabled="config.disabled"
			:round="config.round"
		></i-radio>

		<template #config>
			<i-grid
				cols="4 3:800 2:600"
				gap="20px"
				refer="container"
				class="pd-12"
			>
				<i-checkbox v-model="config.disabled" type="switch">
					disabled
				</i-checkbox>
				<i-checkbox v-model="config.labelInline" type="switch">
					label-inline
				</i-checkbox>
				<i-checkbox v-model="config.optionInline" type="switch">
					option-inline
				</i-checkbox>
				<i-checkbox v-model="config.round" type="switch">
					round
				</i-checkbox>
				<i-select
					label="type"
					label-inline
					v-model="config.type"
					:options="[
						{
							label: '普通类型',
							value: 'default',
						},
						{
							label: '按钮类型',
							value: 'button',
						},
					]"
				></i-select>
			</i-grid>
		</template>
	</Demo>

	<h3 class="mt-40 mb-12">属性设置</h3>
	<Props :props="propsGuidence"></Props>
</template>

<script lang="ts" setup>
import Demo from "@d/components/Demo.vue";
import Props from "@d/components/Props.vue";
import type { RadioType } from "@p/components/radio/types";
import { iCheckbox, iGrid, iRadio, iSelect } from "@p/index";
import { reactive, ref } from "vue";

const config = reactive({
	disabled: false,
	type: "default",
	labelInline: false,
	optionInline: true,
	round: false,
});

const model = ref<number>(0);

const html = `
<i-checkbox
	label="单选框"
	v-model="model"
	type="${config.type}"
	:options="options"
	:option-inline="${config.optionInline}"
	:label-inline="${config.labelInline}"
	:disabled="${config.disabled}"
	:round="${config.round}"
></i-checkbox>

`;

const js = `
const model = ref<number>(0);

const options = [
	{
		label: "选项 A",
		value: 0,
	},
	{
		label: "选项 B",
		value: 1,
	},
	{
		label: "不可选",
		value: 2,
		disabled: true,
	},
	{
		label: "选项 D",
		value: 3,
	},
];

`;

const options = [
	{
		label: "选项 A",
		value: 0,
	},
	{
		label: "选项 B",
		value: 1,
	},
	{
		label: "不可选",
		value: 2,
		disabled: true,
	},
	{
		label: "选项 D",
		value: 3,
	},
];

const propsGuidence = [
	{
		name: "v-model",
		type: "boolean | Array",
		defaultValue: "",
		desc: "表单数据模型，只有一个选项的时候为 boolean 类型，有 options 时的时候会自动转为数组类型",
	},
	{
		name: "options",
		type: "Option[]",
		defaultValue: "",
		desc: "选项设置",
		target: "/docs/checkbox/#option",
	},
	{
		name: "label-inline",
		type: "boolean",
		defaultValue: "false",
		desc: "标签与控件内容同一行",
	},
	{
		name: "label-width",
		type: "string",
		defaultValue: "",
		desc: "控件标签的宽度",
	},
	{
		name: "label-align",
		type: "CSS text-align",
		defaultValue: "",
		desc: "控件标签的对齐",
	},
	{
		name: "round",
		type: "boolean",
		defaultValue: "false",
		desc: "圆角，只对 button 类型有效果",
	},
	{
		name: "status",
		type: "'normal' | 'warning' | 'success' | 'error'",
		defaultValue: "'normal'",
		desc: "输入框状态",
	},
	{
		name: "message",
		type: "string",
		defaultValue: "",
		desc: "输入框提示信息",
	},
	{
		name: "rule",
		type: "Rule",
		defaultValue: "",
		desc: "输入框验证规则",
		target: "/docs/input/#rule",
	},
	{
		name: "@invalid",
		type: "event",
		defaultValue: "",
		desc: "输入框校验失败时触发",
		event: true,
	},
];
</script>
