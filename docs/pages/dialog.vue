<template>
	<h3 class="mb-12">使用</h3>

	<Demo :html="code">
		<i-button @click="dialog = !dialog">打开模态框</i-button>
	</Demo>

	<i-dialog v-model="dialog">
		<template #title>🤓</template>
		<div
			style="
				background-image: linear-gradient(
					-225deg,
					#77ffd2 0%,
					#6297db 48%,
					#1eecff 100%
				);
				width: 600px;
				max-width: 100%;
				height: 200px;
			"
		></div>
	</i-dialog>

	<h3 class="mt-40 mb-12">属性说明</h3>
	<Props :props="propsGuidence"></Props>
</template>

<script setup lang="ts">
import Demo from "@d/components/Demo.vue";
import Props from "@d/components/Props.vue";
import { iButton, iDialog } from "@p/index";
import { ref } from "vue";

const dialog = ref<boolean>(false);
const code = `
<i-button @click="dialog = !dialog">打开模态框</i-button>

<i-dialog v-model="dialog">
	<template #title>🤓</template>
	<div
		style="
			background-image: linear-gradient(
				-225deg,
				#77ffd2 0%,
				#6297db 48%,
				#1eecff 100%
			);
			width: 600px;
			max-width: 100%;
			height: 200px;
		"
	></div>
</i-dialog>
`;
const propsGuidence = [
	{
		name: "v-model",
		type: "boolean",
		defaultValue: "false",
		desc: "控制模态框打开/关闭",
		required: true,
	},
	{
		name: "closable",
		type: "boolean",
		defaultValue: "true",
		desc: "是否为可关闭的状态",
	},
	{
		name: "backdrop-closable",
		type: "boolean",
		defaultValue: "true",
		desc: "点击背景层可以关闭模态框",
	},
	{
		name: "customized",
		type: "boolean",
		defaultValue: "false",
		desc: "设置为 true 时，模态框里的内容只显示 slot",
	},
	{
		name: "header",
		type: "boolean",
		defaultValue: "true",
		desc: "显示顶部栏",
	},
	{
		name: "footer",
		type: "boolean",
		defaultValue: "true",
		desc: "显示底部栏",
	},
	{
		name: "close-button",
		type: "boolean",
		defaultValue: "true",
		desc: "显示默认的关闭按钮",
	},
	{
		name: "confirm",
		type: "string",
		defaultValue: "'确认'",
		desc: "确认按钮文本",
	},
	{
		name: "cancel",
		type: "string",
		defaultValue: "'取消'",
		desc: "取消按钮文本",
	},
	{
		name: "#title",
		type: "slot",
		defaultValue: "",
		desc: "通过 slot 传递 title 里的内容",
		slot: true,
	},
	{
		name: "#footer",
		type: "slot",
		defaultValue: "",
		desc: "通过 slot 传递 footer 里的内容",
		slot: true,
	},
	{
		name: "@confirm",
		type: "event",
		defaultValue: "",
		desc: "确认按钮点击触发",
		event: true,
		callback: "() => void",
	},
	{
		name: "@cancel",
		type: "event",
		defaultValue: "",
		desc: "取消按钮点击触发",
		event: true,
		callback: "() => void",
	},
	{
		name: "@toggle",
		type: "event",
		defaultValue: "",
		desc: "模态框打开/关闭时触发",
		event: true,
		callback: "(open: boolean) => void",
	},
];
</script>
