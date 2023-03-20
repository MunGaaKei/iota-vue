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
		<Content v-else></Content>
	</div>
</template>

<script lang="ts" setup name="i-message">
import type { TypeMessage } from './types';
import { withDefaults, h } from 'vue';

const props = withDefaults(
	defineProps<{
		item: TypeMessage;
	}>(),
	{}
);

const handleClick = () => {
	props.item.close?.();
	props.item.onClose?.();
};

const Content = () => h(props.item.content);
</script>
