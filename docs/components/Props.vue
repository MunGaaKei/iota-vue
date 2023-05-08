<template>
	<div class="props-guidence">
		<div class="props-item mb-20" v-for="item in props" :key="item.name">
			<a :id="`${item.name}`" class="inline-flex items-center">
				<TagRound class="hash-tag color-7" />
				<h5 class="blue">{{ item.name }}</h5>
				<span class="mx-12 prop-type color-7">{{ item.type }}</span>
				<code class="color-4">{{ item.defaultValue }}</code>
			</a>
			<p class="mt-4 color-4">{{ item.desc }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { TagRound } from "@vicons/material";
import { withDefaults } from "vue";

export type IProps = {
	name: string;
	type?: string;
	defaultValue?: string;
	desc?: string;
};

withDefaults(
	defineProps<{
		props: IProps[];
	}>(),
	{}
);
</script>

<style lang="scss" scoped>
.hash-tag {
	width: 1em;
	height: 1em;
}
</style>
