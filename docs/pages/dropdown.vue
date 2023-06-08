<template>
	<h3 class="mb-12">使用</h3>
	<Demo :html="html" :js="js">
		<i-dropdown :options="options">
			<template #trigger>
				<i-button>下拉框</i-button>
			</template>
		</i-dropdown>
	</Demo>

	<h3 class="mt-40 mb-12">属性说明</h3>
	<p class="mb-12">
		更多属性设置参考
		<router-link to="/docs/popup" class="blue">Popup</router-link>
	</p>
	<Props :props="propsGuidence"></Props>
</template>

<script lang="ts" setup>
import Demo from "@d/components/Demo.vue";
import Props from "@d/components/Props.vue";
import { iButton, iDropdown } from "@p/index";

const options = [
	{
		label: "选项 A",
		value: 1,
	},
	{
		label: "选项 B",
		value: 2,
	},
];

const html = `
<i-dropdown :options="options">
	<template #trigger>
		<i-button>下拉框</i-button>
	</template>
</i-dropdown>

`;

const js = `
<script setup\>
const options = [
	{
		label: "选项 A",
		value: 1,
	},
	{
		label: "选项 B",
		value: 2,
	},
];
</script\>

`;

const propsGuidence = [
	{
		name: "v-model",
		type: "any",
		defaultValue: "",
		desc: "当前值",
	},
	{
		name: "options",
		type: "Option[]",
		defaultValue: "",
		desc: "选项设置",
		target: "/docs/checkbox/#option",
	},
];
</script>
