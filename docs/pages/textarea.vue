<template>
	<Demo :html="html" active="html">
		<i-textarea label="介绍" style="width: 400px"></i-textarea>
	</Demo>

	<h3 class="mt-40 mb-12">属性设置</h3>
	<p class="mb-20">
		其余属性参考
		<router-link class="blue" to="/docs/input">Input</router-link>
	</p>
	<Props :props="propsGuidence"></Props>
</template>

<script setup lang="ts">
import Demo from "@d/components/Demo.vue";
import Props from "@d/components/Props.vue";
import { iTextarea } from "@p/index";

const html = `
<i-textarea label="介绍" style="width: 400px" />

`;

const propsGuidence = [
	{
		name: "v-model",
		type: "string | number",
		defaultValue: "",
		desc: "文本框数据模型",
	},
	{
		name: "resize",
		type: "boolean",
		defaultValue: "false",
		desc: "文本框是否可以控制大小改变",
	},
];
</script>
