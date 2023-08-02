<template>
	<h3 class="mb-12">使用</h3>
	<Demo :html="html">
		<i-list :type="type">
			<i-list-item>窗外的麻雀</i-list-item>
			<i-list-item>在电线杆上多嘴</i-list-item>
			<i-list-item>你说这一句</i-list-item>
			<i-list-item>很有夏天的感觉</i-list-item>
		</i-list>

		<template #config>
			<div class="flex pd-20">
				<i-select
					label="类型"
					v-model="type"
					:options="[
						{
							label: '未选择',
							value: '',
						},
						{
							label: 'Number',
							value: 'number',
						},
						{
							label: 'Leading Zero',
							value: 'leading-zero',
						},
						{
							label: 'Circle',
							value: 'circle',
						},
						{
							label: 'Option',
							value: 'option',
						},
					]"
					style="width: 200px"
				></i-select>
			</div>
		</template>
	</Demo>

	<h3 class="mt-40 mb-12">自定义前缀</h3>
	<Demo :html="customHtml" :js="customJs">
		<i-list>
			<i-list-item :label="TagRound">窗外的麻雀</i-list-item>
			<i-list-item :label="TagRound">在电线杆上多嘴</i-list-item>
			<i-list-item :label="TagRound" active>你说这一句</i-list-item>
			<i-list-item :label="TagRound">很有夏天的感觉</i-list-item>
		</i-list>
	</Demo>

	<h3 class="mt-80 mb-12">属性设置</h3>
	<Props :props="propsGuidence"></Props>

	<h3 class="mt-40 mb-12">列表项属性设置</h3>
	<p class="mb-20">对应 <code>&lt;i-list-item&gt;</code></p>
	<Props :props="itemPropsGuidence"></Props>
</template>

<script lang="ts" setup>
import Demo from "@d/components/Demo.vue";
import Props from "@d/components/Props.vue";
import type { ListType } from "@p/components/list/types";
import { iList, iListItem, iSelect } from "@p/index";
import { TagRound } from "@vicons/material";
import { ref } from "vue";

const type = ref<ListType>("number");

const html = `
<i-list :type="type">
    <i-list-item>窗外的麻雀</i-list-item>
    <i-list-item>在电线杆上多嘴</i-list-item>
    <i-list-item>你说这一句</i-list-item>
    <i-list-item>很有夏天的感觉</i-list-item>
</i-list>

`;

const customHtml = `
<i-list>
    <i-list-item :label="TagRound">窗外的麻雀</i-list-item>
    <i-list-item :label="TagRound">在电线杆上多嘴</i-list-item>
    <i-list-item :label="TagRound" active>你说这一句</i-list-item>
    <i-list-item :label="TagRound">很有夏天的感觉</i-list-item>
</i-list>

`;

const customJs = `
import { TagRound } from "@vicons/material";

`;

const propsGuidence = [
	{
		name: "type",
		type: "'number' | 'circle' | 'option' | 'leading-zero'",
		defaultValue: "",
		desc: "基础的列表类型，区分主要是列表前缀。'option'类型主要用于选择功能。",
	},
	{
		name: "label-width",
		type: "string",
		defaultValue: "",
		desc: "统一设置列表项前缀宽度",
	},
	{
		name: "label-align",
		type: "CSS text-align",
		defaultValue: "",
		desc: "统一设置列表项前缀文本对齐方式",
	},
];

const itemPropsGuidence = [
	{
		name: "label",
		type: "string | VNode | Component | undefined",
		defaultValue: "",
		desc: "列表项自定义前缀",
	},
	{
		name: "type",
		type: "'item' | 'title'",
		defaultValue: "'item'",
		desc: "列表子标题",
	},
	{
		name: "active",
		type: "boolean",
		defaultValue: "false",
		desc: "列表项激活状态",
	},
];
</script>
