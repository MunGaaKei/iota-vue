<template>
	<h3 class="mb-12">使用</h3>
	<Demo :html="html" active="html">
		<i-page v-model="page" :total="11"></i-page>
	</Demo>

	<h3 class="mt-40 mb-12">属性设置</h3>
	<Props :props="propsGuidence"></Props>
</template>

<script lang="ts" setup>
import Demo from "@d/components/Demo.vue";
import Props from "@d/components/Props.vue";
import { iPage } from "@p/index";
import { ref } from "vue";

const page = ref<number>(1);

const html = `
<i-page v-model="page" :total="11"></i-page>

`;

const propsGuidence = [
	{
		name: "v-model | page",
		type: "number",
		defaultValue: "1",
		desc: "当前页",
	},
	{
		name: "total",
		type: "number",
		defaultValue: "0",
		desc: "总页数，当大于 1 时才会显示",
	},
	{
		name: "size",
		type: "string",
		defaultValue: "1.5em",
		desc: "图标尺寸",
	},
	{
		name: "prev",
		type: "string | VNode | Component",
		defaultValue: "xicons: KeyboardArrowLeftRound",
		desc: "上一页按钮内容渲染",
	},
	{
		name: "next",
		type: "string | VNode | Component",
		defaultValue: "xicons: KeyboardArrowRightRound",
		desc: "下一页按钮内容渲染",
	},
	{
		name: "sibling",
		type: "number",
		defaultValue: "2",
		desc: "当前页相邻显示的页码数量",
	},
	{
		name: "ripple",
		type: "boolean",
		defaultValue: "true",
		desc: "按钮点击波纹效果",
	},
	{
		name: "@page-click",
		type: "(page: number) => void",
		defaultValue: "",
		desc: "点击页码时触发",
		event: true,
	},
];
</script>
