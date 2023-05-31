<template>
	<h3 class="mb-12">使用</h3>

	<i-swiper style="max-width: 500px" draggable>
		<div class="swiper-block" v-for="i in 5">{{ i }}</div>
		<div class="swiper-block">6</div>
		<div class="swiper-block">7</div>
	</i-swiper>

	<h3 class="mt-80 mb-12">垂直方向</h3>
	<i-swiper style="max-width: 500px" vertical :display="2" :item-height="120">
		<div class="swiper-block" v-for="i in 5">{{ i }}</div>
		<div class="swiper-block">6</div>
		<div class="swiper-block">7</div>
	</i-swiper>
</template>

<script setup lang="ts">
import { iSwiper } from "@p/components";
</script>

<style scoped>
.swiper-block {
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
	color: #212121;
	text-align: center;
	font-size: 4rem;
	font-weight: 900;
	border-radius: var(--radius);
}
</style>
