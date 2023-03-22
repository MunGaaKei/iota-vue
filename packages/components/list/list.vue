<template>
	<ul
		class="i-list"
		:class="ulClass"
		:style="ulStyle"
	>
		<slot></slot>
	</ul>
</template>

<script lang="ts" setup name="i-list">
import { computed, withDefaults } from 'vue';
import './list.scss';

const props = withDefaults(
	defineProps<{
		labelWidth?: string;
		listType?: 'number' | 'point';
	}>(),
	{}
);

const ulStyle = computed(() => {
	return {
		'--label-width': props.labelWidth
	};
});

const ulClass = computed(() => {
	return {
		[`i-list-${props.listType}`]: props.listType
	};
});
</script>
