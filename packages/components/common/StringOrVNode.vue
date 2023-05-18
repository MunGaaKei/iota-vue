<template>
	<template v-if="typeof content === 'string'">{{ content }}</template>
	<component v-else :is="content"></component>
</template>

<script setup lang="ts">
import type { TypeStringOrVNode } from "../@types";

export type IProps = {
	content: TypeStringOrVNode;
};

withDefaults(defineProps<IProps>(), {});
</script>
