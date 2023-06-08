<template>
	<div class="props-guidence">
		<div class="props-item mb-20" v-for="item in props" :key="item.name">
			<div :id="`${item.name}`" class="flex items-center">
				<a :id="`${item.name}`" class="inline-flex items-center">
					<h5
						:class="{
							blue: !item.slot && !item.event,
							green: item.event,
						}"
					>
						{{ item.name }}
					</h5>
				</a>
				<span v-if="item.required" class="mx-4 red">*</span>
				<span class="mx-12 prop-type color-7">
					<a v-if="item.target" :href="item.target" class="green">
						{{ item.type }}
					</a>
					<template v-else>{{ item.type }}</template>
				</span>
				<code class="color-4">{{ item.defaultValue }}</code>
			</div>
			<p v-if="item.callback">{{ item.callback }}</p>
			<p class="mt-4 color-4">{{ item.desc }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { withDefaults } from "vue";

export type IProps = {
	name: string;
	type?: string;
	defaultValue?: string;
	desc?: string;
	required?: boolean;
	slot?: boolean;
	event?: boolean;
	callback?: string;
	target?: string;
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
