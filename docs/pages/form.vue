<template>
	<i-form
		ref="formRef"
		v-model="formData"
		gap="1em"
		label-inline
		label-width="100px"
		label-align="right"
		style="width: 500px"
	>
		<i-input name="name" v-model="formData.name" label="name"></i-input>
		<div class="flex">
			<i-input
				name="age"
				type="number"
				v-model="formData.age"
				label="age"
			></i-input>
			<i-select
				name="gender"
				label="gender"
				:options="[
					{ label: '男', value: 0 },
					{ label: '女', value: 1 },
				]"
				v-model="formData.gender"
			></i-select>
		</div>
		<i-textarea label="bio" v-model="formData.bio"></i-textarea>
		<i-button class="ml-auto" plain @click="handleReset">重置</i-button>
		<i-button @click="handleSubmit">提交</i-button>
	</i-form>

	<div class="mt-40">
		{{ formData }}
	</div>
</template>

<script setup lang="ts">
import { iButton, iForm, iInput, iSelect, iTextarea } from "@p/components";
import { reactive, ref } from "vue";

const formData = reactive({
	name: "",
	age: 0,
	gender: 0,
	bio: "",
});

const formRef = ref();

const handleSubmit = (e: Event) => {
	const isValid = formRef.value?.validate();
	console.log(isValid);
};

const handleReset = () => {
	formRef.value?.reset();
};
</script>
