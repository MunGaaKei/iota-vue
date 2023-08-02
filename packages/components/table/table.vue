<template>
	<div
		class="i-table-container"
		:class="{
			'i-table-loading': loading,
		}"
		:style="containerStyle"
	>
		<table
			class="i-table"
			:style="{
				width,
			}"
		>
			<thead v-if="columns && header" class="i-table-thead">
				<tr>
					<th
						v-for="th in computedColumns"
						:key="th.key"
						class="i-table-th"
						:class="{
							[`sticky-${th.sticky}`]: th.sticky,
						}"
						:style="{
							width: th.width,
							textAlign: th.align,
						}"
					>
						<StringOrVNode
							:content="th.title || th.key"
						></StringOrVNode>
					</th>
				</tr>
			</thead>
			<tr class="i-table-tr" v-for="(tr, row) in data" :key="row">
				<template v-if="columns">
					<td
						v-for="(td, col) in computedColumns"
						:key="td.key"
						:colspan="td.colspan"
						:rowspan="td.rowspan"
						class="i-table-td"
						:class="{
							[`sticky-${td.sticky}`]: td.sticky,
						}"
						:style="{
							textAlign: td.align,
						}"
						@click="emits('item-click', $event, tr, td.key)"
						@dblclick="emits('item-dblclick', $event, tr, td.key)"
					>
						<StringOrVNode
							v-if="td.render"
							:content="td.render(tr, row, col)"
						></StringOrVNode>
						<template v-else>{{ tr[td.key] }}</template>
					</td>
				</template>
				<template v-else>
					<td
						class="i-table-td"
						v-for="(td, k) in tr"
						:key="k"
						v-html="td"
						@click="emits('item-click', $event, tr, k)"
						@dblclick="emits('item-dblclick', $event, tr, td.key)"
					></td>
				</template>
			</tr>
		</table>

		<div v-if="loading" class="i-loading-container">
			<span class="i-loading-icon"></span>
		</div>

		<div class="i-table-footer sticky-bottom sticky-left bg-blur">
			<slot name="footer"></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import StringOrVNode from "../common/StringOrVNode.vue";
import "./table.scss";
import type { Table } from "./types";

defineOptions({
	name: "i-table",
});

const props = withDefaults(defineProps<Table>(), {
	header: true,
	data: () => [],
});

const emits = defineEmits<{
	(event: "item-click", e: Event, item: any, key: string | number): void;
	(event: "item-dblclick", e: Event, item: any, key: string | number): void;
}>();

const computedColumns = computed(() => {
	if (!props.columns) return;

	return props.columns.map((col) => {
		return typeof col === "string"
			? {
					key: col,
					title: col,
			  }
			: col;
	});
});

const containerStyle = computed(() => {
	return {
		maxHeight: props.maxHeight,
	};
});
</script>
