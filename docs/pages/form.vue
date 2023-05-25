<template>
	<i-form
		ref="formRef"
		v-model="formData"
		gap="1em"
		label-inline
		label-width="100px"
		label-align="right"
		style="width: 500px"
		:initial-value="initialValue()"
	>
		<i-input
			name="name"
			v-model="formData.name"
			label="name"
			:rule="{
				invalid: (v) => {
					return v === '' ? '必填' : false;
				},
			}"
			required
		></i-input>
		<i-radio
			name="gender"
			v-model="formData.gender"
			label="gender"
			option-inline
			label-inline
			:options="[
				{ label: '男', value: 0 },
				{ label: '女', value: 1 },
			]"
		></i-radio>
		<i-checkbox
			name="hobit"
			label="hobit"
			:options="[
				{ label: '足球', value: 'football' },
				{ label: '篮球', value: 'basketball' },
				{ label: '排球', value: 'volleyball' },
			]"
			v-model="formData.hobit"
			:rule="{
				invalid: (v: string[]) => {
					return !v.length ? '请至少选择一项兴趣' : false;
				},
			}"
		>
		</i-checkbox>
		<div class="flex">
			<i-input
				name="age"
				type="number"
				v-model="formData.age"
				label="age"
			></i-input>
			<i-select
				placeholder="country"
				name="country"
				label="country"
				:rule="{
					status: 'warning',
					invalid: (v) => {
						return v === '' ? '请选择国家' : false;
					},
				}"
				:options="[
					{ label: '未选择', value: '' },
					{ label: '中国', value: 'china' },
					{ label: '美国', value: 'america' },
					{ label: '日本', value: 'japan' },
					{ label: '其它', value: 'others' },
				]"
				v-model="formData.country"
			></i-select>
		</div>
		<i-textarea
			name="bio"
			label="bio"
			v-model="formData.bio"
			:rule="{
				invalid: (v) => {
					return v === '' ? '必填' : false;
				},
			}"
		></i-textarea>
		<i-checkbox
			name="agree"
			v-model="formData.agree"
			label=" "
			:rule="{
				invalid: (v) => {
					return !v ? '提交前请勾选' : false;
				},
			}"
		>
			同意相关条款
		</i-checkbox>
		<i-button class="ml-auto" plain @click="handleReset">重置</i-button>
		<i-button @click="handleSubmit">提交</i-button>
	</i-form>

	<div class="mt-40">
		{{ formData }}
	</div>
</template>

<script setup lang="ts">
import {
	iButton,
	iCheckbox,
	iForm,
	iInput,
	iRadio,
	iSelect,
	iTextarea,
	useMessage,
} from "@p/components";
import { reactive, ref } from "vue";

const initialValue = () => {
	return {
		name: "",
		age: 0,
		gender: 0,
		hobit: [],
		bio: "",
		country: "",
		agree: false,
	};
};
const formData = reactive(initialValue());
const [message] = useMessage();
const formRef = ref();

const handleSubmit = (e: Event) => {
	const isValid = formRef.value?.validate();

	if (isValid) {
		message("✌️✌️ 提交成功");
	} else {
		message({
			content: "🥲 验证失败",
			classname: "bg-red",
		});
	}
};

const handleReset = () => {
	Object.assign(formData, initialValue());
};
</script>
