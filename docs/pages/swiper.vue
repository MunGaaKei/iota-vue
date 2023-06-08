<template>
	<h3 class="mb-12">使用</h3>

	<Demo :html="html">
		<i-swiper style="width: 500px" draggable>
			<div class="swiper-block" v-for="i in 5">{{ i }}</div>
			<div class="swiper-block">6</div>
			<div class="swiper-block">7</div>
		</i-swiper>
	</Demo>

	<h3 class="mt-80 mb-12">垂直方向</h3>
	<Demo :html="html2">
		<i-swiper style="width: 500px" vertical :display="2" :item-height="120">
			<div class="swiper-block" v-for="i in 5">{{ i }}</div>
			<div class="swiper-block">6</div>
			<div class="swiper-block">7</div>
		</i-swiper>
	</Demo>

	<h3 class="mt-40 mb-12">属性设置</h3>
	<Props :props="propsGuidence"></Props>
</template>

<script setup lang="ts">
import Demo from "@d/components/Demo.vue";
import Props from "@d/components/Props.vue";
import { iSwiper } from "@p/index";

const html = `
<i-swiper style="width: 500px" draggable>
	<div class="swiper-block" v-for="i in 5">{{ i }}</div>
	<div class="swiper-block">6</div>
	<div class="swiper-block">7</div>
</i-swiper>

`;

const html2 = `
<i-swiper style="width: 500px" vertical :display="2" :item-height="120">
	<div class="swiper-block" v-for="i in 5">{{ i }}</div>
	<div class="swiper-block">6</div>
	<div class="swiper-block">7</div>
</i-swiper>

`;

const propsGuidence = [
	{
		name: "type",
		type: "'normal' | 'fade'",
		defaultValue: "'normal'",
		desc: "轮播类型",
	},
	{
		name: "display",
		type: "number",
		defaultValue: "1",
		desc: "每屏展示的数量，仅支持 'noraml' 类型",
	},
	{
		name: "scroll",
		type: "number",
		defaultValue: "1",
		desc: "每屏切换的数量，仅支持 'noraml' 类型",
	},
	{
		name: "duration",
		type: "number",
		defaultValue: "600",
		desc: "切换动画时长，单位 ms",
	},
	{
		name: "autoplay",
		type: "boolean",
		defaultValue: "false",
		desc: "自动轮播",
	},
	{
		name: "interval",
		type: "number",
		defaultValue: "3000",
		desc: "自动轮播时，时间间隔",
	},
	{
		name: "loop",
		type: "boolean",
		defaultValue: "true",
		desc: "轮播循环",
	},
	{
		name: "indicator",
		type: "boolean",
		defaultValue: "true",
		desc: "轮播指示点",
	},
	{
		name: "draggable",
		type: "boolean",
		defaultValue: "false",
		desc: "是否可以拖拽",
	},
	{
		name: "drag-offset",
		type: "number",
		defaultValue: "40",
		desc: "拖拽距离触发阈值，单位 px",
	},
	{
		name: "pause-on-hover",
		type: "boolean",
		defaultValue: "true",
		desc: "鼠标悬停时暂停自动轮播",
	},
	{
		name: "vertical",
		type: "boolean",
		defaultValue: "false",
		desc: "垂直方向，仅支持 'noraml' 类型",
	},
	{
		name: "initial",
		type: "number",
		defaultValue: "0",
		desc: "初始索引值",
	},
	{
		name: "gap",
		type: "number",
		defaultValue: "0",
		desc: "轮播项间间隔，单位 px",
	},
	{
		name: "item-height",
		type: "number",
		defaultValue: "",
		desc: "垂直方向时，每项的高度（必须声明）",
	},
	{
		name: "prev",
		type: "false | string | VNode | Component",
		defaultValue: "xicons: KeyboardArrowLeftRound",
		desc: "下一屏按钮内容渲染，设置 false 会隐藏",
	},
	{
		name: "next",
		type: "false | string | VNode | Component",
		defaultValue: "xicons: KeyboardArrowRightRound",
		desc: "上一屏按钮内容渲染，设置 false 会隐藏",
	},
	{
		name: "@init",
		type: "() => void",
		defaultValue: "",
		desc: "初始化后触发",
		event: true,
	},
	{
		name: "@before-swipe",
		type: "(index: number) => void",
		defaultValue: "",
		desc: "滑动前触发，参数为滑动前的当前项索引值",
		event: true,
	},
	{
		name: "@after-swipe",
		type: "(index: number) => void",
		defaultValue: "",
		desc: "滑动后触发，参数为滑动后的当前项索引值",
		event: true,
	},
];
</script>

<style scoped>
.swiper-block {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
	color: #212121;
	text-align: center;
	font-size: 4rem;
	font-weight: 900;
	border-radius: var(--radius);
}
</style>
