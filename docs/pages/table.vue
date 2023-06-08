<template>
	<h3 class="mb-12">使用</h3>

	<Demo :html="html" :js="js">
		<i-table
			:data="displayData"
			:columns="columns"
			max-height="500px"
			width="1500px"
			@item-click="handleClick"
			class="mb-12"
		>
			<template #footer>
				<i-page
					v-model="page"
					:total="Math.ceil(data.length / PAGESIZE)"
				></i-page>
			</template>
		</i-table>
	</Demo>

	<h3 class="mt-40 mb-12">属性设置</h3>
	<Props :props="propsGuidence"></Props>

	<h3 class="mt-40 mb-12">columns 设置</h3>
	<Props :props="columnProp"></Props>
</template>

<script setup lang="ts">
import Demo from "@d/components/Demo.vue";
import Props from "@d/components/Props.vue";
import { iButton, iPage, iTable, useMessage } from "@p/index";
import { mock } from "mockjs";
import { computed, h, ref } from "vue";

interface User {
	id: number;
	name: string;
	email: string;
	phone: number;
	gender: number;
	tags: string[];
	birth: string;
	address: number;
	active: boolean;
}
const PAGESIZE = 10;
const message = useMessage();

const html = `
<i-table
	:data="displayData"
	:columns="columns"
	max-height="500px"
	width="1500px"
	@item-click="handleClick"
	class="mb-12"
>
	<template #footer>
		<i-page
			v-model="page"
			:total="Math.ceil(data.length / PAGESIZE)"
		></i-page>
	</template>
</i-table>

`;

const js = `
import { iButton, iPage, iTable, useMessage } from "iota";
import { h, ref, computed } from "vue";
import { mock } from "mockjs";

const PAGESIZE = 10;
const message = useMessage();
const columns = [
	"id",
	{
		key: "name",
		title: "姓名",
		sticky: "left",
		width: "80px",
	},
	...,
	{
		key: "gender",
		title: "性别",
		width: "80px",
		render: (item: User, i: number) => {
			return item.gender === 0 ? "男" : "女";
		},
	},
	...,
	{
		key: "tags",
		title: "标签",
		render: (item: User) => {
			return h(
				"div",
				{},
				item.tags.map((tag) => {
					return h(
						"span",
						{ class: "chip mr-4 rounded py-4 bg-green" },
						tag
					);
				})
			);
		},
	},
	...
];

const data = ref<User[]>(
	mock({
		"data|81": [
			{
				"id|+1": 1,
				name: "@cname",
				email: "@email",
				phone: /^1[385][1-9]\d{8}/,
				"gender|0-1": 0,
				birth: "@date",
				"tags|0-2": ["@ctitle(2)"],
				address: "@county(true)",
				active: "@boolean",
			},
		],
	}).data
);

const page = ref<number>(1);

const displayData = computed(() => {
	return data.value.slice((page.value - 1) * PAGESIZE, page.value * PAGESIZE);
});

const handleClick = (e: Event, item: any) => {
	message({
		content: \`你点击了 \${item.name} 的数据\`,
		classname: "bg-pink",
	});
};

`;

const columns = [
	{
		key: "id",
		width: "90px",
	},
	{
		key: "name",
		title: "姓名",
		sticky: "left",
		width: "80px",
	},
	{
		key: "email",
		title: "邮箱",
		width: "280px",
	},
	{
		key: "gender",
		title: "性别",
		width: "80px",
		render: (item: User, i: number) => {
			return item.gender === 0 ? "男" : "女";
		},
	},
	{
		key: "phone",
		title: "手机号码",
	},
	{
		key: "birth",
		title: "出生日期",
	},
	{
		key: "tags",
		title: "标签",
		render: (item: User) => {
			return h(
				"div",
				{},
				item.tags.map((tag) => {
					return h(
						"span",
						{ class: "chip mr-4 rounded py-4 bg-green" },
						tag
					);
				})
			);
		},
	},
	{
		key: "address",
		title: "地址",
		width: "400px",
	},
	{
		key: "action",
		title: "操作",
		align: "center",
		width: "120px",
		sticky: "right",
		render: (item: User) => {
			return h(
				iButton,
				{
					flat: item.active,
					class: item.active ? "blue" : "bg-blue",
					onClick: () => {
						item.active = !item.active;
					},
				},
				() => (item.active ? "取关" : "关注")
			);
		},
	},
];

const data = ref<User[]>(
	mock({
		"data|81": [
			{
				"id|+1": 1,
				name: "@cname",
				email: "@email",
				phone: /^1[385][1-9]\d{8}/,
				"gender|0-1": 0,
				birth: "@date",
				"tags|0-2": ["@ctitle(2)"],
				address: "@county(true)",
				active: "@boolean",
			},
		],
	}).data
);

const page = ref<number>(1);

const displayData = computed(() => {
	return data.value.slice((page.value - 1) * PAGESIZE, page.value * PAGESIZE);
});

const handleClick = (e: Event, item: any) => {
	message({
		content: `你点击了 ${item.name} 的数据`,
		classname: "bg-pink",
	});
};

const propsGuidence = [
	{
		name: "data",
		type: "any[]",
		defaultValue: "() => []",
		desc: "表格数据",
	},
	{
		name: "columns",
		type: "any[]",
		defaultValue: "",
		desc: "表格列渲染方式",
	},
	{
		name: "header",
		type: "boolean",
		defaultValue: "true",
		desc: "显示表格头部栏",
	},
	{
		name: "loading",
		type: "boolean",
		defaultValue: "false",
		desc: "表格加载状态，该状态下无法对表格进行交互",
	},
	{
		name: "width",
		type: "string",
		defaultValue: "",
		desc: "表格宽度",
	},
	{
		name: "max-height",
		type: "string",
		defaultValue: "",
		desc: "表格最大高度",
	},
	{
		name: "#footer",
		type: "slot",
		defaultValue: "",
		desc: "通过 slot 传递 footer 里的内容",
		slot: true,
	},
	{
		name: "@item-click",
		type: "(e: Event, item: any, key: string | number) => void",
		defaultValue: "",
		desc: "点击数据行触发",
		event: true,
	},
	{
		name: "@item-dblclick",
		type: "(e: Event, item: any, key: string | number) => void",
		defaultValue: "",
		desc: "双击数据行触发",
		event: true,
	},
];

const columnProp = [
	{
		name: "key",
		type: "string | number",
		defaultValue: "",
		desc: "该列数据项索引",
	},
	{
		name: "title",
		type: "string | VNode | Component",
		defaultValue: "",
		desc: "该列头部渲染",
	},
	{
		name: "width",
		type: "string",
		defaultValue: "",
		desc: "该列表格宽度",
	},
	{
		name: "align",
		type: "'left' | 'center' | 'right'",
		defaultValue: "'left'",
		desc: "该列表格文本对齐方式",
	},
	{
		name: "sticky",
		type: "'left' | 'right' | undefined",
		defaultValue: "undefined",
		desc: "该列可以左右吸附",
	},
	{
		name: "render",
		type: "() => h()",
		defaultValue: "",
		desc: "该列表格内容渲染方式",
	},
];
</script>
