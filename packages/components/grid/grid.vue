<template>
	<div ref="grid" class="i-grid" :style="gridStyle">
		<slot></slot>
	</div>
</template>

<script lang="ts" setup>
import { useState } from "@p/js/useState";
import { throttle } from "lodash";
import { computed, onMounted, onUnmounted, ref } from "vue";
import "./grid.scss";
import type { Grid } from "./types";

defineOptions({
	name: "i-grid",
});

const grid = ref<HTMLElement>();
const props = withDefaults(defineProps<Grid>(), {
	cols: "1",
	refer: "window",
});

const sorter = (a: number, b: number): number => a - b;
const columns: string[] = props.cols.split(" ");
const [defaultColumn, setDefaultColumn] = useState<number>(0);
const [currentColumn, setCurrentColumn] = useState<number>(0);
const [bps, numbers] = getBreakpoints();

const resizeListener = throttle(() => {
	const w0 =
		props.refer === "window"
			? window.innerWidth
			: (grid.value as HTMLElement).offsetWidth;
	const index = bps.findIndex((point: number) => w0 < point);

	setCurrentColumn(index > -1 ? numbers[index] : defaultColumn.value);
}, 160);

function getBreakpoints(): number[][] {
	const bps: number[] = [];
	const numbers: number[] = [];

	columns.map((col: string) => {
		const kv = col.split(":");
		const n = Number(kv[0]);

		if (kv.length > 1) {
			bps.push(Number(kv[1]));
			numbers.push(n);
		} else {
			setDefaultColumn(Number(n));
		}
	});

	bps.sort(sorter);
	numbers.sort(sorter);

	return [bps, numbers];
}

const gridStyle = computed(() => {
	const gtc = `repeat(${currentColumn.value}, 1fr)`;

	return {
		"grid-template-columns": gtc,
		gap: props.gap,
	};
});

setCurrentColumn(defaultColumn.value);
if (bps.length > 0) {
	onMounted(() => {
		window.addEventListener("resize", resizeListener);
	});

	onUnmounted(() => {
		window.removeEventListener("resize", resizeListener);
	});
}
</script>
