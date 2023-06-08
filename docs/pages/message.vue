<template>
	<h3 class="mb-12">使用</h3>
	<p class="mb-12">
		不同于其它组件，此功能使用 <code>js</code> 直接调用。通过
		<code>useMessage()</code>
		返回调用的方法。<span class="green">
			调用的方法也会返回一个关闭此条消息的函数
		</span>
		。
	</p>

	<Demo :html="html" :js="js">
		<i-button @click="handleClick">CALL</i-button>
	</Demo>

	<h3 class="mt-80 mb-12">配置参数说明</h3>
	<p class="mb-20">对应 <code>useMessage( config )</code></p>
	<Props :props="propsGuidence"></Props>

	<h3 class="mt-40 mb-12">发出消息函数参数说明</h3>
	<p class="mb-20">
		对应 <code>message( config | string )</code>，同时支持
		<code>useMessage</code> 的参数配置。
	</p>
	<Props :props="itemPropsGuidence"></Props>
</template>

<script lang="ts" setup>
import Demo from "@d/components/Demo.vue";
import Props from "@d/components/Props.vue";
import { iButton, useMessage } from "@p/index";
import { random } from "lodash";
import { h } from "vue";

const message = useMessage({
	classname: "bg-yellow",
	max: 4,
});
let i = 0;

const html = `
<i-button @click="handleClick">CALL</i-button>

`;

const js = `
import { iButton, useMessage } from "iota";
import { random } from "lodash";
import { h } from "vue";

const message = useMessage({
	classname: "bg-yellow",
	max: 4,
});
let i = 0;

/*
const closeThisMessage = message('message content');
also works
*/

const handleClick = () => {
	i++;
	message({
		content: h(
			"div",
			{
				style: {
					lineHeight: i % 2 === 0 ? "2.5em" : "1.5em",
				},
			},
			\`message: \${i}\`
		),
		classname: [
			"bg-blue",
			"bg-pink",
			"bg-red",
			"bg-green",
			"bg-yellow",
			"bg-black",
			"bg-purple",
			"bg-white",
		][random(0, 7)],
	});
};

`;

const handleClick = () => {
	i++;
	message({
		content: h(
			"div",
			{
				style: {
					lineHeight: i % 2 === 0 ? "2.5em" : "1.5em",
				},
			},
			`message: ${i}`
		),
		classname: [
			"bg-blue",
			"bg-pink",
			"bg-red",
			"bg-green",
			"bg-yellow",
			"bg-black",
			"bg-purple",
			"bg-white",
		][random(0, 7)],
	});
};

const propsGuidence = [
	{
		name: "duration",
		type: "number",
		defaultValue: "3000",
		desc: "消息持续时长，单位 ms",
	},
	{
		name: "classname",
		type: "string",
		defaultValue: "",
		desc: "消息类名，一般用来配置颜色",
	},
	{
		name: "fromStart",
		type: "boolean",
		defaultValue: "true",
		desc: "消息从队首进入",
	},
	{
		name: "bottom",
		type: "boolean",
		defaultValue: "false",
		desc: "消息在屏幕底部进入",
	},
	{
		name: "closable",
		type: "boolean",
		defaultValue: "true",
		desc: "点击消息可以关闭",
	},
	{
		name: "align",
		type: "'center' | 'left' | 'right'",
		defaultValue: "'center'",
		desc: "消息基于屏幕左右位置",
	},
	{
		name: "gap",
		type: "number",
		defaultValue: "8",
		desc: "消息间间距",
	},
	{
		name: "offset",
		type: "string",
		defaultValue: "12px",
		desc: "消息与屏幕边框间距",
	},
	{
		name: "max",
		type: "number",
		defaultValue: "0",
		desc: "最多展示消息数量，0 表示无限制",
	},
];

const itemPropsGuidence = [
	{
		name: "content",
		type: "string | VNode | Component",
		defaultValue: "",
		desc: "消息内容渲染",
	},
	{
		name: "onClose",
		type: "() => void",
		defaultValue: "",
		desc: "单条消息隐藏时触发",
		event: true,
	},
];
</script>
