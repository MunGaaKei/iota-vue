<template>
	<h3 class="mb-12">使用</h3>

	<Demo>
		<i-table
			:data="displayData"
			:columns="columns"
			max-height="500px"
			width="1500px"
			@item:dblclick="handleClick"
			class="mb-12"
		>
			<template #footer>
				<i-page
					v-model="page"
					:total="Math.ceil(data.length / PAGESIZE)"
				></i-page>
			</template>
		</i-table>
	</Demo>
</template>

<script setup lang="ts">
import Demo from "@d/components/Demo.vue";
import { iButton, iPage, iTable } from "@p/components";
import { mock } from "mockjs";
import { computed, h, ref } from "vue";

interface User {
	id: number;
	name: string;
	email: string;
	phone: number;
	gender: number;
	tags: string[];
	birth: string;
	address: number;
	active: boolean;
}
const PAGESIZE = 10;

const columns = [
	{
		key: "id",
		width: "90px",
	},
	{
		key: "name",
		title: "姓名",
		sticky: "left",
		width: "80px",
	},
	{
		key: "email",
		title: "邮箱",
		width: "280px",
	},
	{
		key: "gender",
		title: "性别",
		width: "80px",
		render: (item: User, i: number) => {
			return item.gender === 0 ? "男" : "女";
		},
	},
	{
		key: "phone",
		title: "手机号码",
	},
	{
		key: "birth",
		title: "出生日期",
	},
	{
		key: "tags",
		title: "标签",
		render: (item: User) => {
			return h(
				"div",
				{},
				item.tags.map((tag) => {
					return h(
						"span",
						{ class: "chip mr-4 rounded py-4 bg-green" },
						tag
					);
				})
			);
		},
	},
	{
		key: "address",
		title: "地址",
		width: "400px",
	},
	{
		key: "action",
		title: "操作",
		align: "center",
		width: "120px",
		sticky: "right",
		render: (item: User) => {
			return h(
				iButton,
				{
					flat: item.active,
					class: item.active ? "blue" : "bg-blue",
					onClick: () => {
						item.active = !item.active;
					},
				},
				() => (item.active ? "取关" : "关注")
			);
		},
	},
];

const data = ref<User[]>(
	mock({
		"data|81": [
			{
				"id|+1": 1,
				name: "@cname",
				email: "@email",
				phone: /^1[385][1-9]\d{8}/,
				"gender|0-1": 0,
				birth: "@date",
				"tags|0-2": ["@ctitle(2)"],
				address: "@county(true)",
				active: "@boolean",
			},
		],
	}).data
);

const page = ref<number>(1);

const displayData = computed(() => {
	return data.value.slice((page.value - 1) * PAGESIZE, page.value * PAGESIZE);
});

const handleClick = (e: Event, item: any) => {
	console.log(e, item);
};
</script>
