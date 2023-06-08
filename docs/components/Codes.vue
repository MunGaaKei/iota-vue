<template>
	<pre class="codes-pre line-numbers">
        <code :class="`language-${type}`" v-html="html"></code>
    </pre>
</template>

<script lang="ts" setup>
import "@d/assets/prism-theme-one-dark.min.css";
import { highlight, languages } from "prismjs";
import { computed, withDefaults } from "vue";

const props = withDefaults(
	defineProps<{
		type?: string;
		code: string;
	}>(),
	{
		type: "html",
		code: "",
	}
);

const html = computed(() => {
	return highlight(props.code, languages[props.type], props.type);
});
</script>

<style lang="scss" scoped>
.codes-pre {
	margin: 0;
	padding: 0 20px;
	border-radius: var(--radius);
	white-space: initial;
	font-size: 0.9em;
	> code {
		display: block;
		margin: 0;
		padding: 0;
	}
}
</style>
