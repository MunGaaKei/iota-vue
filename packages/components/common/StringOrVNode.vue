<template>
	<template v-if="['string', 'number'].includes(typeof content)">
		{{ content }}
	</template>
	<component v-else :is="content"></component>
</template>

<script setup lang="ts">
import type { TypeStringOrVNode } from "../@types";

export type IProps = {
	content: TypeStringOrVNode;
};

defineOptions({
	name: "StringOrVNode",
});

withDefaults(defineProps<IProps>(), {});
</script>
