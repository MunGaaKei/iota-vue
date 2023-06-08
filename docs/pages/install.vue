<template>
	<h3 class="mb-12">安装</h3>
	<Codes :code="installNode" type="bash"></Codes>

	<h3 class="mt-40 mb-12">使用组件</h3>
	<Demo :html="html" active="html">
		<i-button>按钮</i-button>
	</Demo>
</template>

<script lang="ts" setup>
import Codes from "@d/components/Codes.vue";
import Demo from "@d/components/Demo.vue";
import { iButton } from "@p/index";

const installNode = `
npm install iota-v --save

`;

const html = `
<i-button>按钮</i-button>

\<script setup\>
import { iButton } from "iota-v";
\</script\>

`;
</script>
