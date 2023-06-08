<template>
	<h3 class="mb-12">使用</h3>

	<Demo :html="html" active="html">
		<i-popup>
			<template #trigger>
				<i-button> HOVER ME</i-button>
			</template>
			<div class="pd-12 bg-blue">👋👋</div>
		</i-popup>
	</Demo>

	<h3 class="mb-12 mt-40">属性设置</h3>
	<Props :props="propsGuidence"></Props>
</template>

<script lang="ts" setup>
import Demo from "@d/components/Demo.vue";
import Props from "@d/components/Props.vue";
import { iButton, iPopup } from "@p/index";

const html = `
<i-popup>
	<template #trigger>
		<i-button> HOVER ME</i-button>
	</template>
	<div class="pd-12 bg-blue">👋👋</div>
</i-popup>

`;

const propsGuidence = [
	{
		name: "trigger",
		type: "'hover' | 'click' | 'focus'",
		defaultValue: "'hover'",
		desc: "触发行为",
	},
	{
		name: "position",
		type: "'left' | 'top'| 'right'| 'bottom'",
		defaultValue: "",
		desc: "偏向显示位置",
	},
	{
		name: "gap",
		type: "number",
		defaultValue: "4",
		desc: "相距间隔，单位为 px",
	},
	{
		name: "touchable",
		type: "boolean",
		defaultValue: "false",
		desc: "弹出层可以交互",
	},
	{
		name: "body",
		type: "boolean",
		defaultValue: "false",
		desc: "弹出层根据 document.body 定位，默认根据相对父级节点",
	},
	{
		name: "disabled",
		type: "boolean",
		defaultValue: "false",
		desc: "是否允许触发",
	},
	{
		name: "#trigger",
		type: "slot",
		defaultValue: "",
		desc: "触发的组件节点",
		slot: true,
	},
	{
		name: "@show",
		type: "event",
		defaultValue: "",
		desc: "显示时触发",
		event: true,
		callback: "() => void",
	},
	{
		name: "@hide",
		type: "event",
		defaultValue: "",
		desc: "隐藏时触发",
		event: true,
		callback: "() => void",
	},
];
</script>
