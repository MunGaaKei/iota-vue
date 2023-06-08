<template>
	<h3 class="mb-12">使用</h3>
	<p>使用很简单</p>
	<Demo :html="html" :js="js" active="html">
		<i-button v-clickoutside="handleClickoutside">
			点击我以外的地方
		</i-button>
	</Demo>
</template>

<script lang="ts" setup>
import Demo from "@d/components/Demo.vue";
import { iButton, useMessage, vClickoutside } from "@p/index";

const html = `
<i-button v-clickoutside="handleClickoutside">
	点击我以外的地方
</i-button>

`;

const js = `
import { iButton, useMessage, vClickoutside } from "iota";

const message = useMessage();

const handleClickoutside = () => {
	message({
		content: "我向你敬礼",
		classname: "bg-yellow",
		max: 1,
	});
};
`;

const message = useMessage();

const handleClickoutside = () => {
	message({
		content: "我向你敬礼",
		classname: "bg-yellow",
		max: 1,
	});
};
</script>
