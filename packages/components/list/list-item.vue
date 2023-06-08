<template>
	<li
		v-if="type === 'item'"
		class="i-list-item"
		:class="{
			active,
		}"
	>
		<div v-if="label" class="i-list-label">
			<StringOrVNode :content="label"></StringOrVNode>
		</div>

		<div class="i-list-content">
			<slot></slot>
		</div>
	</li>
	<li v-else class="i-list-title">
		<slot></slot>
	</li>
</template>

<script setup lang="ts">
import { withDefaults } from "vue";
import StringOrVNode from "../common/StringOrVNode.vue";
import type { ListItem } from "./types";

defineOptions({
	name: "i-list-item",
});

const props = withDefaults(defineProps<ListItem>(), {
	type: "item",
});
</script>
