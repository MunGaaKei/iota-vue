<template>
	<h3 class="mb-12">使用</h3>

	<Demo :html="html" :js="js">
		<i-tab style="width: 800px" closable @tab-remove="handleRemove">
			<i-tab-item v-for="tab in tabs" :key="tab.key" :title="tab.title">
				<div class="pd-12">{{ tab.content }}</div>
			</i-tab-item>

			<i-tab-item title="title last" key="last">
				<div class="pd-12">content last</div>
			</i-tab-item>

			<template #suffix>
				<i-button class="ml-4 bg-blue" @click="handleClick">
					添加
				</i-button>
			</template>
		</i-tab>
	</Demo>

	<h3 class="mt-40 mb-12">属性设置</h3>
	<Props :props="propsGuidence"></Props>

	<h3 class="mt-40 mb-12">标签页子项属性设置</h3>
	<Props :props="itemPropsGuidence"></Props>
</template>

<script setup lang="ts">
import Demo from "@d/components/Demo.vue";
import Props from "@d/components/Props.vue";
import { iButton, iTab, iTabItem, useMessage } from "@p/index";
import { ref } from "vue";

const message = useMessage({
	max: 1,
});
let i = 0;
const tabs = ref(
	new Array(11).fill(0).map(() => {
		i += 1;
		return {
			key: `${i}`,
			title: `title ${i}`,
			content: `content ${i}`,
		};
	})
);

const handleClick = () => {
	i += 1;
	tabs.value.push({
		key: `${i}`,
		title: `title ${i}`,
		content: `content ${i}`,
	});
};

const handleRemove = (key: string) => {
	const i = tabs.value.findIndex((tab) => tab.key === key);
	i > -1 && tabs.value.splice(i, 1);

	message({
		content: `关闭了 title ${key} `,
		classname: "bg-pink",
	});
};

const html = `
<i-tab style="width: 800px">
	<i-tab-item v-for="tab in tabs" :key="tab.key" :title="tab.title">
		<div class="pd-12">{{ tab.content }}</div>
	</i-tab-item>

	<i-tab-item title="title last" key="last">
		<div class="pd-12">content last</div>
	</i-tab-item>

	<template #suffix>
		<i-button class="ml-4 bg-blue" @click="handleClick">
			添加
		</i-button>
	</template>
</i-tab>

`;

const js = `
const message = useMessage({
	max: 1,
});
let i = 0;

const tabs = ref(
	new Array(11).fill(0).map(() => {
		i += 1;
		return {
			key: \`\${i}\`,
			title: \`title \${i}\`,
			content: \`content \${i}\`,
		};
	})
);

const handleClick = () => {
	i += 1;
	tabs.value.push({
		key: \`\${i}\`,
		title: \`title \${i}\`,
		content: \`content \${i}\`,
	});
};

const handleRemove = (key: string) => {
	const i = tabs.value.findIndex((tab) => tab.key === key);
	i > -1 && tabs.value.splice(i, 1);

	message({
		content: \`关闭了title \${key} \`,
		classname: "bg-pink",
	});
};

`;

const propsGuidence = [
	{
		name: "active",
		type: "string",
		defaultValue: "",
		desc: "当前显示的索引",
	},
	{
		name: "vertical",
		type: "boolean",
		defaultValue: "false",
		desc: "垂直显示",
	},
	{
		name: "animate-bar",
		type: "boolean",
		defaultValue: "true",
		desc: "显示动画条，当 closable 为 true 时会自动隐藏",
	},
	{
		name: "click-toggle",
		type: "boolean",
		defaultValue: "false",
		desc: "点击当前显示的导航按钮时会进行隐藏的操作逻辑",
	},
	{
		name: "navbar-class",
		type: "string | CSS Object",
		defaultValue: "",
		desc: "导航栏的 class",
	},
	{
		name: "closable",
		type: "boolean",
		defaultValue: "false",
		desc: "导航按钮显示关闭按钮",
	},
	{
		name: "ripple",
		type: "boolean",
		defaultValue: "true",
		desc: "导航按钮点击波纹效果",
	},
	{
		name: "#prefix",
		type: "slot",
		defaultValue: "",
		desc: "导航栏前置内容",
		slot: true,
	},
	{
		name: "#suffix",
		type: "slot",
		defaultValue: "",
		desc: "导航栏后置内容",
		slot: true,
	},
	{
		name: "@tab-open",
		type: "event",
		defaultValue: "",
		desc: "标签页打开时触发",
		event: true,
		callback: "(key: string, tab: TabItem) => void",
	},
	{
		name: "@tab-close",
		type: "event",
		defaultValue: "",
		desc: "标签页隐藏时触发",
		event: true,
		callback: "(key: string, tab: TabItem) => void",
	},
	{
		name: "@tab-remove",
		type: "event",
		defaultValue: "",
		desc: "标签页关闭按钮点击时触发",
		event: true,
		callback: "(key: string, tab: TabItem) => void",
	},
];

const itemPropsGuidence = [
	{
		name: "key",
		type: "string",
		defaultValue: "",
		desc: "tab 的索引，建议设置",
	},
	{
		name: "props",
		type: "Object",
		defaultValue: "",
		desc: "导航按钮的 props",
	},
	{
		name: "title",
		type: "string | VNode | Component",
		defaultValue: "",
		desc: "tab 标题渲染",
	},
	{
		name: "content",
		type: "string | VNode | Component",
		defaultValue: "",
		desc: "tab 内容渲染，通常推荐直接使用 slot 传入就行",
	},
	{
		name: "visible",
		type: "boolean",
		defaultValue: "true",
		desc: "是否显示该 tab",
	},
];
</script>
