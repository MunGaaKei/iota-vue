<template>
	<h3 class="mb-12">使用</h3>

	<i-tab closable>
		<i-tab-item v-for="tab in tabs" :key="tab.key" :title="tab.title">
			<div class="pd-12">{{ tab.content }}</div>
		</i-tab-item>

		<i-tab-item title="title last" key="last">
			<div class="pd-12">content last</div>
		</i-tab-item>

		<template #suffix>
			<i-button class="ml-4 my-auto blue" plain>更多</i-button>
		</template>
	</i-tab>

	<i-button class="mt-20" @click="handleClick">添加</i-button>

	<div style="height: 1000px"></div>
</template>

<script setup lang="ts">
import { iButton, iTab, iTabItem } from "@p/components";
import { ref } from "vue";

let i = 0;
const tabs = ref(
	new Array(11).fill(0).map(() => {
		i += 1;
		return {
			key: i,
			title: `title ${i}`,
			content: `content ${i}`,
		};
	})
);

const handleClick = () => {
	i += 1;
	tabs.value.push({
		key: i,
		title: `title ${i}`,
		content: `content ${i}`,
	});
};
</script>
