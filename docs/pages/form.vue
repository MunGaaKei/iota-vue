<template>
	<i-form v-model="formData">
		<i-input
			name="name"
			v-model="formData.name"
			message="sdf"
			label="name"
		></i-input>
	</i-form>
</template>

<script setup lang="ts">
import { iForm, iInput } from "@p/components";
import { reactive } from "vue";

const formData = reactive({
	name: "",
	age: 0,
	gender: 0,
	bio: "",
});
</script>
