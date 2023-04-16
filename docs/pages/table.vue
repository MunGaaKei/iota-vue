<template>
    <h3 class="mb-12">使用</h3>

    <i-table
        :data="data"
        :columns="columns"
        max-height="500px"
        width="1500px"
        loading
        @item:dblclick="handleClick"
    >
        <template #footer>
            <i-page
                v-model="page"
                :total="Math.ceil(columns.length / 15)"
            ></i-page>
        </template>
    </i-table>
</template>

<script setup lang="ts">
import { iButton, iPage, iTable } from "@p/components";
import { useState } from "@p/js/useState";
import { mock } from "mockjs";
import { h, ref } from "vue";

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
        "data|40-60": [
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

const [page, setPage] = useState<number>(0);

const handleClick = (e: Event, item: any) => {
    console.log(e, item);
};
</script>
