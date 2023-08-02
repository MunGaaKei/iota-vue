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
import { Ref } from "vue";
import iMessage from "./message.vue";
import { Message } from "./types";

interface IProps {
	items: Message[];
	align?: Ref<string>;
	offset?: Ref<string>;
}

withDefaults(defineProps<IProps>(), {});
</script>
