<template>
	<component :is="icon" class="i-icon" :style="iconStyle"></component>
</template>

<script lang="ts" setup>
import { computed, withDefaults } from "vue";
import "./icon.scss";
import type { Icon } from "./types";

defineOptions({
	name: "i-icon",
});

const props = withDefaults(defineProps<Icon>(), {
	size: "1.5em",
	align: "middle",
});

const iconStyle = computed(() => {
	return {
		width: `${props.size}`,
		height: `${props.size}`,
		verticalAlign: `${props.align}`,
	};
});
</script>
