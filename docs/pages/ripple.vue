<template>
	<h3 class="mb-12">使用</h3>
	<p>
		使用很简单，当传入
		<code>false</code>
		值时也可以取消触发。该指令使用了事件代理，不必担心过多绑定导致的性能问题。
	</p>
	<p>
		需要注意的是，容器的 <code>position</code> 属性值不能为默认的
		<code>static</code>。
	</p>
	<Demo :html="html" :js="js" active="html">
		<div
			class="rounded-slight bg-grey relative"
			style="width: 200px; height: 200px"
			v-ripple
		></div>
	</Demo>
</template>

<script lang="ts" setup>
import Demo from "@d/components/Demo.vue";
import { vRipple } from "@p/index";

const html = `
<div
    class="rounded-slight bg-grey relative"
    style="width: 200px; height: 200px"
    v-ripple
></div>

`;

const js = `
import { vRipple } from "iota";

`;
</script>
