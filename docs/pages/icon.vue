<template>
	<h3 class="mb-12">使用</h3>
	<p>
		推荐使用
		<a href="https://www.xicons.org/" class="blue">xicons</a
		>，本组件主要是为了更方便使用 <code>svg</code> 类型图标。
	</p>
	<Demo :html="html">
		<i-icon :icon="EmojiEmotionsTwotone" class="yellow" size="3em"></i-icon>
	</Demo>

	<h3 class="mt-40 mb-12">属性设置</h3>
	<Props :props="propsGuidence"></Props>
</template>

<script lang="ts" setup>
import Demo from "@d/components/Demo.vue";
import Props from "@d/components/Props.vue";
import { iIcon } from "@p/index";
import { EmojiEmotionsTwotone } from "@vicons/material";

const html = `
<i-icon :icon="EmojiEmotionsTwotone" class="yellow" size="3em"></i-icon>

`;

const propsGuidence = [
	{
		name: "icon",
		type: "VNode | Component",
		defaultValue: "",
		desc: "图标",
	},
	{
		name: "size",
		type: "string",
		defaultValue: "1.5em",
		desc: "图标尺寸",
	},
	{
		name: "align",
		type: "CSS vertical-align",
		defaultValue: "'middle'",
		desc: "图标垂直对齐方式",
	},
];
</script>
