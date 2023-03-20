<template>
	<h3 class="mb-12">使用</h3>

	<Demo>
		<i-button @click="handleClick">CALL OUT</i-button>
	</Demo>
</template>

<script lang="ts" setup>
import { iButton, useMessage } from '@p/components';
import Demo from '@d/components/Demo.vue';
import { h } from 'vue';

const [message] = useMessage({
	classname: 'bg-yellow',
	max: 2,
	duration: 0,
});
let i = 0;

const handleClick = () => {
	i++;
	message({
		content: h(
			'div',
			{
				style: {
					lineHeight: i % 2 === 0 ? '2.5em' : '1.5em',
				},
			},
			`message: ${i}`
		),
	});
};
</script>
