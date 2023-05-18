<template>
	<li
		v-if="type === 'item'"
		class="i-list-item"
		:class="{
			active,
		}"
	>
		<labelItem v-if="label"></labelItem>
		<div class="i-list-content">
			<slot></slot>
		</div>
	</li>
	<li v-else class="i-list-title">
		<slot></slot>
	</li>
</template>

<script setup lang="ts">
import type { VNode } from "vue";
import { h, withDefaults } from "vue";
import type { ListItem } from "./types";

defineOptions({
	name: "i-list-item",
});

const props = withDefaults(defineProps<ListItem>(), {
	type: "item",
});

const labelItem = (): VNode => {
	const p = {
		class: "i-list-label",
	};

	return h("div", p, props.label as VNode);
};
</script>
