<template>
	<h3 class="mb-12">单选</h3>
	<Demo :html="singleHtml" :js="singleJs">
		<i-select
			label="选择"
			:options="options"
			v-model="value"
			style="width: 300px"
			label-inline
			placeholder="holder"
		></i-select>
	</Demo>

	<h3 class="mt-80 mb-12">多选</h3>
	<p class="my-12">
		多选框会根据 <code>v-model</code> 类型自动判断单选或多选
	</p>
	<Demo :html="multipleHtml" :js="multipleJs">
		<i-select
			label="选择"
			:options="options"
			v-model="values"
			placeholder="请选择"
			style="width: 300px"
			allow-clear
			label-inline
			:max-display="2"
		></i-select>
	</Demo>

	<h3 class="mt-40 mb-12">属性设置</h3>
	<Props :props="propsGuidence"></Props>
</template>

<script lang="ts" setup>
import Demo from "@d/components/Demo.vue";
import Props from "@d/components/Props.vue";
import { iSelect } from "@p/index";
import mock from "mockjs";
import { ref } from "vue";

const options = mock.mock({
	"array|18": [
		{
			label: "@ctitle",
			value: "@title",
			disabled: "@boolean",
		},
	],
}).array;
const value = ref("");
const values = ref([]);

const singleHtml = `
<i-select
	label="选择"
	:options="options"
	v-model="value"
	style="width: 300px"
	label-inline
	placeholder="holder"
></i-select>

`;
const singleJs = `
const options = mock.mock({
	"array|18": [
		{
			label: "@ctitle",
			value: "@title",
			disabled: "@boolean",
		},
	],
}).array;

const value = ref("");

`;

const multipleHtml = `
<i-select
	label="选择"
	:options="options"
	v-model="values"
	placeholder="请选择"
	style="width: 300px"
	allow-clear
	label-inline
	:max-display="2"
></i-select>

`;
const multipleJs = `
const options = mock.mock({
	"array|18": [
		{
			label: "@ctitle",
			value: "@title",
			disabled: "@boolean",
		},
	],
}).array;

const values = ref([]);

`;

const propsGuidence = [
	{
		name: "v-model",
		type: "string | number | boolean | Array",
		defaultValue: "",
		desc: "当初始模型为 Array 类型时，选择框自动为多选功能",
	},
	{
		name: "options",
		type: "Option[]",
		defaultValue: "",
		desc: "选项设置",
		target: "/docs/checkbox/#option",
	},
	{
		name: "chip",
		type: "boolean",
		defaultValue: "false",
		desc: "多选时，已选择的值展示样式，点击可以取消选择",
	},
	{
		name: "wrap",
		type: "boolean",
		defaultValue: "false",
		desc: "多选时，已选择的值可以在选择框里换行",
	},
	{
		name: "max-display",
		type: "number",
		defaultValue: "",
		desc: "多选时，选择框里最多展示值的数量，多余的数量会以剩余数字的方式展示",
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
		name: "#prefix",
		type: "slot",
		defaultValue: "",
		desc: "输入框前置内容",
		slot: true,
	},
	{
		name: "#suffix",
		type: "slot",
		defaultValue: "",
		desc: "输入框后置内容",
		slot: true,
	},
	{
		name: "@select",
		type: "event",
		defaultValue: "",
		desc: "选择时触发",
		event: true,
		callback: "(option: Option) => void",
	},
	{
		name: "@invalid",
		type: "event",
		defaultValue: "",
		desc: "输入框校验失败时触发",
		event: true,
	},
	{
		name: "@show",
		type: "event",
		defaultValue: "",
		desc: "显示时触发",
		event: true,
	},
	{
		name: "@hide",
		type: "event",
		defaultValue: "",
		desc: "隐藏时触发",
		event: true,
	},
];
</script>
