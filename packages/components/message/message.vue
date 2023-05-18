<template>
	<div
		:id="`i-message-${item.id}`"
		class="i-message px-12 py-4"
		:class="[
			{
				active: item.active,
			},
			item.classname,
		]"
		:style="item.offsetTop"
		@click="handleClick"
	>
		<div
			v-if="typeof item.content === 'string'"
			v-html="item.content"
			class="i-message-content"
		></div>
		<component v-else :is="item.content"></component>
	</div>
</template>

<script lang="ts" setup>
import { withDefaults } from "vue";
import type { Message } from "./types";

defineOptions({
	name: "i-message",
});

const props = withDefaults(
	defineProps<{
		item: Message;
	}>(),
	{}
);

const handleClick = () => {
	props.item.close?.();
	props.item.onClose?.();
};
</script>
