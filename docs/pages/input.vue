<template>
	<Demo :js="js" :html="html">
		<i-input
			label="姓名"
			v-model="text"
			:allow-clear="config.allowClear"
			:label-inline="config.labelInline"
			:disabled="config.disabled"
			:round="config.round"
			:status="config.status as InputStatus"
			:rule="{
				invalid,
			}"
			style="width: 400px"
		>
			<template #prefix>
				<i-icon
					:icon="PersonalInjuryTwotone"
					class="mx-8 my-auto blue"
				></i-icon>
			</template>
		</i-input>

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
				<i-checkbox v-model="config.round" type="switch">
					round
				</i-checkbox>
				<i-checkbox v-model="config.allowClear" type="switch">
					allow-clear
				</i-checkbox>
				<i-select
					label="status"
					label-inline
					v-model="config.status"
					:options="[
						{
							label: '正常状态',
							value: 'normal',
						},
						{
							label: '警告状态',
							value: 'warning',
						},
						{
							label: '成功状态',
							value: 'success',
						},
						{
							label: '错误状态',
							value: 'error',
						},
					]"
				></i-select>
			</i-grid>
		</template>
	</Demo>

	<h3 class="mt-40 mb-12">属性设置</h3>
	<p class="mb-20">支持普通的输入框属性和事件，但不列在下方说明</p>
	<Props :props="propsGuidence"></Props>

	<h5 id="rule" class="mb-12 mt-40 green">Rule</h5>
	<Props :props="ruleProps"></Props>
</template>

<script setup lang="ts">
import Demo from "@d/components/Demo.vue";
import Props from "@d/components/Props.vue";
import { iCheckbox, iGrid, iIcon, iInput, iSelect } from "@p/index";
import { InputStatus } from "@p/index/@types";
import { PersonalInjuryTwotone } from "@vicons/material";
import { reactive, ref } from "vue";

const text = ref<string>("");
const invalid = (v: string) => {
	return v ? false : "必填";
};

const config = reactive({
	disabled: false,
	labelInline: false,
	round: false,
	status: "normal",
	allowClear: true,
});

const html = `
<i-input
    label="姓名"
    v-model="text"
    :allow-clear="${config.allowClear}"
    :label-inline="${config.labelInline}"
    :disabled="${config.disabled}"
    :round="${config.round}"
    :status="${config.status as InputStatus}"
    :rule="{
        invalid
    }"
    style="width: 400px"
>
    <template #prefix>
        <i-icon
            :icon="PersonalInjuryTwotone"
            class="mx-8 my-auto blue"
        ></i-icon>
    </template>
</i-input>

`;

const js = `
const text = ref<string>("");

const invalid = (v) => {
    return v ? false : '必填';
}

`;

const propsGuidence = [
	{
		name: "v-model",
		type: "string | number",
		defaultValue: "string",
		desc: "输入框数据模型",
	},
	{
		name: "type",
		type: "HTMLInput type",
		defaultValue: "'text'",
		desc: "输入框类型",
	},
	{
		name: "label",
		type: "string",
		defaultValue: "",
		desc: "输入框标签",
	},
	{
		name: "label-inline",
		type: "boolean",
		defaultValue: "false",
		desc: "标签与控件内容同一行",
	},
	{
		name: "allow-clear",
		type: "boolean",
		defaultValue: "false",
		desc: "输入框有值时显示清空图标",
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
		target: "#rule",
	},
	{
		name: "trigger",
		type: "string",
		defaultValue: "'change'",
		desc: "输入框触发校验的行为，可传入支持的浏览器输入框事件名称，以及特殊的比如 hover",
	},
	{
		name: "round",
		type: "boolean",
		defaultValue: "false",
		desc: "输入框圆角",
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
		name: "@invalid",
		type: "event",
		defaultValue: "",
		desc: "输入框校验失败时触发",
		event: true,
	},
];

const ruleProps = [
	{
		name: "status",
		type: "'normal' | 'warning' | 'success' | 'error'",
		defaultValue: "'error'",
		desc: "输入框验证失败时状态",
	},
	{
		name: "invalid",
		type: "Function",
		desc: "输入框校验函数，校验失败时需返回字符串类型的错误提示信息，校验成功时返回 false 即可",
		event: true,
		callback: "(value: string | number) => string | false",
	},
];
</script>
