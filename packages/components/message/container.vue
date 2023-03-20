<template>
	<div
		class="i-messages"
		:style="{
			alignItems: align?.value,
			inset: offset?.value,
		}"
	>
		<i-message
			v-for="item in items"
			:key="item.id"
			:item="item"
		></i-message>
	</div>
</template>

<script setup lang="ts">
import iMessage from './message.vue';
import { TypeMessage } from './types';
import { withDefaults, Ref } from 'vue';

withDefaults(
	defineProps<{
		items: TypeMessage[];
		align?: Ref<string>;
		offset?: Ref<string>;
	}>(),
	{}
);
</script>
