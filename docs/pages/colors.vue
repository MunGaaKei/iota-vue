<template>
	<h3 class="mb-12">种类</h3>

	<i-grid cols="4 3:1000 2:800" gap="12px" class="my-40" refer="container">
		<template v-for="color in names" :key="color">
			<div class="rounded-slight" style="overflow: hidden">
				<div class="pd-12" :class="`bg-${color}`">
					<b>.{{ color }}: {{ colors[color] }}</b>
				</div>
				<div class="pd-12" :class="`bg-${color}-1`">1</div>
				<div class="pd-12" :class="`bg-${color}-2`">2</div>
				<div class="pd-12" :class="`bg-${color}-slight`">slight</div>
			</div>
		</template>
	</i-grid>

	<h3 class="mb-12 mt-80">类名规则</h3>
	<i-list class="mt-12" label-width="60px">
		<i-list-item type="title">
			<code>.bg-[color]-[n]</code>
		</i-list-item>
		<i-list-item type="title">
			<code>.[color]-[n]</code>
		</i-list-item>
		<i-list-item label="[color]">
			颜色名称，可选值为
			<code v-for="color in Object.keys(colors)" :key="color">
				{{ color }}
			</code>
		</i-list-item>
		<i-list-item label="[n]">
			颜色程度，可选值为 <code>1</code>
			<code>2</code>
			<code>slight</code>
		</i-list-item>

		<div class="mt-40">
			字体色从 <code>1</code> 到
			<code>9</code>
			<div class="flex mt-12">
				<div
					v-for="i in 9"
					:key="i"
					class="black-circle mr-4"
					:class="`background-${i}`"
				>
					{{ i }}
				</div>
			</div>
			<div class="flex mt-12">
				<div
					v-for="i in 9"
					:key="i"
					class="black-circle mr-4"
					:class="`color-${i}`"
				>
					{{ i }}
				</div>
			</div>
		</div>
	</i-list>
</template>

<script lang="ts" setup>
import { iGrid, iList, iListItem } from "@p/index";

const colors: Record<string, string> = {
	white: "#fff",
	black: "#000",
	red: "#dc143c",
	blue: "#1e90ff",
	green: "#419175",
	yellow: "#ffc549",
	grey: "#d7d7d7",
	pink: "#ff69b4",
	purple: "#8a2be2",
};
const names = Object.keys(colors);
</script>

<style lang="scss" scoped>
.black-circle {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	border-radius: 50%;
}
</style>
