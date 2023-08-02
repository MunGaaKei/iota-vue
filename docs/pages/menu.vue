<template>
	<h3 class="mb-12">使用</h3>
	<Demo :html="html" :js="js">
		<i-menu
			:items="menus"
			style="width: 300px"
			selectable
			@item-click="handleClick"
			@toggle="handleToggle"
		></i-menu>
	</Demo>

	<h3 class="mt-40 mb-12">属性设置</h3>
	<Props :props="propsGuidence"></Props>

	<h3 id="menu-item" class="mt-40 mb-12">节点属性设置</h3>
	<Props :props="itemProps"></Props>
</template>

<script lang="ts" setup>
import Demo from "@d/components/Demo.vue";
import Props from "@d/components/Props.vue";
import { iMenu, useMessage } from "@p/index";
import {
	ApiRound,
	DashboardTwotone,
	SmartButtonRound,
	TableChartTwotone,
	TripOriginRound,
} from "@vicons/material";
import { h, ref } from "vue";

const html = `
<i-menu
    :items="menus"
    style="width: 300px"
    selectable
    @item-click="handleClick"
    @toggle="handleToggle"
></i-menu>

`;

const js = `
import { iMenu, useMessage } from "iota";
const message = useMessage();

const menus = ref([
	{
		title: "Components",
		icon: () => h(DashboardTwotone),
		expanded: true,
		children: [
			{
				title: "Button",
				icon: () => h(SmartButtonRound),
			},
			{
				title: "Table",
				icon: () => h(TableChartTwotone),
			},
		],
	},
	{
		title: "Directives",
		icon: () => h(ApiRound),
		children: [
			{
				title: "Ripple",
				icon: () => h(TripOriginRound),
			},
		],
	},
	{
		title: "Level 1",
		children: [
			{
				title: "Level 2",
				children: [
					{
						title: "Level 3",
						children: [
							{
								title: "Level 4",
							},
						],
					},
				],
			},
		],
	},
]);

const handleClick = (item: any) => {
	message({
		content: \`点击了 \${item.title}\`,
		classname: "bg-grey",
		max: 2,
	});
};

const handleToggle = (expanded: boolean, item: any) => {
	message({
		content: \`\${expanded ? "打开" : "关闭"}了 \${item.title}\`,
		classname: "bg-pink",
		max: 2,
	});
};

`;

const message = useMessage();

const menus = ref([
	{
		title: "Components",
		icon: h(DashboardTwotone),
		expanded: true,
		children: [
			{
				title: "Button",
				icon: h(SmartButtonRound),
			},
			{
				title: "Table",
				icon: h(TableChartTwotone),
			},
		],
	},
	{
		title: "Directives",
		icon: h(ApiRound),
		children: [
			{
				title: "Ripple <b>1</b>",
				icon: h(TripOriginRound),
			},
		],
	},
	{
		title: "Level 1",
		children: [
			{
				title: "Level 2",
				children: [
					{
						title: "Level 3",
						children: [
							{
								title: "Level 4",
							},
						],
					},
				],
			},
		],
	},
]);

const handleClick = (item: any) => {
	message({
		content: `点击了 ${item.title}`,
		classname: "bg-grey",
		max: 2,
	});
};

const handleToggle = (expanded: boolean, item: any) => {
	message({
		content: `${expanded ? "打开" : "关闭"}了 ${item.title}`,
		classname: "bg-pink",
		max: 2,
	});
};

const propsGuidence = [
	{
		name: "items",
		type: "MenuItem[]",
		defaultValue: "() => []",
		desc: "数据项数组",
		target: "#menu-item",
	},
	{
		name: "selectable",
		type: "boolean",
		defaultValue: "false",
		desc: "显示已选择的样式",
	},
	{
		name: "round",
		type: "boolean",
		defaultValue: "false",
		desc: "节点圆角",
	},
	{
		name: "ripple",
		type: "boolean",
		defaultValue: "true",
		desc: "节点点击波纹效果",
	},
	{
		name: "@item-click",
		type: "(item: MenuItem, e: Event) => void",
		defaultValue: "",
		desc: "点击节点时触发",
		event: true,
	},
	{
		name: "@toggle",
		type: "(expanded: boolean, item: MenuItem) => void",
		defaultValue: "",
		desc: "展开或收缩节点时触发",
		event: true,
	},
];

const itemProps = [
	{
		name: "type",
		type: "'node' | 'title'",
		defaultValue: "'node'",
		desc: "节点类型",
	},
	{
		name: "title",
		type: "string",
		defaultValue: "",
		desc: "节点显示文本",
	},
	{
		name: "icon",
		type: "VNode | Component",
		defaultValue: "",
		desc: "节点图标",
	},
	{
		name: "key",
		type: "string",
		defaultValue: "",
		desc: "节点项索引值",
	},
	{
		name: "expanded",
		type: "boolean",
		defaultValue: "false",
		desc: "节点展开状态，仅当节点有子节点并且子节点数量 > 0 时有效",
	},
	{
		name: "to",
		type: "string",
		defaultValue: "",
		desc: "对应 <router-link> 的 to 属性",
	},
	{
		name: "href",
		type: "string",
		defaultValue: "",
		desc: "对应 <a> 的 href 属性",
	},
	{
		name: "children",
		type: "MenuItem[]",
		defaultValue: "",
		desc: "子节点列表",
	},
	{
		name: "disabled",
		type: "boolean",
		defaultValue: "false",
		desc: "节点状态",
	},
];
</script>
