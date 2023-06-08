<template>
	<h3 class="mb-12">使用</h3>

	<Demo :html="code">
		<div class="relative w-100" style="min-height: 240px">
			<i-container v-model="collapsed" breakpoint="600px">
				<template #header>
					<div class="mb-12 bg-grey pd-12 rounded-slight w-100">
						<i-button
							square
							plain
							class="black"
							@click="collapsed = !collapsed"
						>
							<i-icon :icon="MenuFilled"></i-icon>
						</i-button>
						header
					</div>
				</template>
				<template #sider>
					<div
						class="mr-12 bg-pink pd-12 rounded-slight"
						style="width: 280px; min-height: 100px"
					>
						sider
					</div>
				</template>
				<template #footer>
					<div class="mt-12 bg-grey pd-12 rounded-slight w-100">
						footer
					</div>
				</template>

				<div
					class="bg-blue pd-12 rounded-slight"
					style="min-height: 100px"
				>
					content
				</div>
			</i-container>
		</div>
	</Demo>

	<h3 class="mb-12 mt-40">属性设置</h3>
	<Props :props="propsGuidence"></Props>
</template>

<script setup lang="ts">
import Demo from "@d/components/Demo.vue";
import Props from "@d/components/Props.vue";
import { iButton, iContainer, iIcon } from "@p/index";
import { MenuFilled } from "@vicons/material";
import { ref } from "vue";

const collapsed = ref<boolean>(false);
const code = `
<div class="relative w-100" style="min-height: 240px">
	<i-container v-model="collapsed" breakpoint="600px">
		<template #header>
			<div class="mb-12 bg-grey pd-12 rounded-slight w-100">
				<i-button
					square
					plain
					class="black"
					@click="collapsed = !collapsed"
				>
					<i-icon :icon="MenuFilled"></i-icon>
				</i-button>
				header
			</div>
		</template>
		<template #sider>
			<div
				class="mr-12 bg-pink pd-12 rounded-slight"
				style="width: 280px; min-height: 100px"
			>
				sider
			</div>
		</template>
		<template #footer>
			<div class="mt-12 bg-grey pd-12 rounded-slight w-100">
				footer
			</div>
		</template>

		<div
			class="bg-blue pd-12 rounded-slight"
			style="min-height: 100px"
		>
			content
		</div>
	</i-container>
</div>
		
`;
const propsGuidence = [
	{
		name: "v-model",
		type: "boolean",
		defaultValue: "false",
		desc: "控制侧边栏打开和关闭",
	},
	{
		name: "layout",
		type: "'default' | 'menu'",
		defaultValue: "'default'",
		desc: "容器布局样式",
	},
	{
		name: "breakpoint",
		type: "string",
		defaultValue: "'980px'",
		desc: "侧边栏自动打开/关闭响应宽度，依据的是页面宽度",
	},
	{
		name: "header-class",
		type: "string | Object",
		defaultValue: "'sticky-top bg-blur'",
		desc: "header 类名",
	},
	{
		name: "sider-class",
		type: "string | Object",
		defaultValue: "",
		desc: "sider 类名",
	},
	{
		name: "content-class",
		type: "string | Object",
		defaultValue: "",
		desc: "content 类名",
	},
	{
		name: "footer-class",
		type: "string | Object",
		defaultValue: "",
		desc: "footer 类名",
	},
	{
		name: "#header",
		type: "slot",
		defaultValue: "",
		desc: "通过 slot 传递 header 里的内容",
		slot: true,
	},
	{
		name: "#sider",
		type: "slot",
		defaultValue: "",
		desc: "通过 slot 传递 sider 里的内容",
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
		name: "@sider-toggle",
		type: "event",
		defaultValue: "",
		desc: "侧边栏打开/关闭时触发",
		event: true,
		callback: "(collapsed: boolean) => void",
	},
];
</script>
