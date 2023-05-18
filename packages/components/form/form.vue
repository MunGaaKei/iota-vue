<template>
	<form :name="name">
		<slot></slot>
	</form>
</template>

<script setup lang="ts">
import { withDefaults } from "vue";
import "./form.scss";
import type { Form } from "./types";

defineOptions({
	name: "i-form",
});

const props = withDefaults(defineProps<Form>(), {});
</script>
