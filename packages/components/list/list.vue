<template>
	<ul class="i-list" :class="ulClass" :style="ulStyle">
		<slot></slot>
	</ul>
</template>

<script lang="ts" setup>
import { computed, withDefaults } from "vue";
import "./list.scss";
import type { List } from "./types";

defineOptions({
	name: "i-list",
});

const props = withDefaults(defineProps<List>(), {
	labelAlign: "left",
});

const ulStyle = computed(() => {
	return {
		"--label-align": props.labelAlign,
		"--label-width": props.labelWidth,
	};
});

const ulClass = computed(() => {
	return {
		[`i-list-${props.type}`]: props.type,
	};
});
</script>
