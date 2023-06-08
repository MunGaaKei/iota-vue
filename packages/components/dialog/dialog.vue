<template>
	<Teleport to="body">
		<div
			class="i-container i-backdrop"
			:class="{
				flex: modelValue,
				active,
			}"
			@click.self="handleBackDropClick"
		>
			<div
				class="i-dialog"
				:class="{
					bounced,
				}"
				v-bind="$attrs"
			>
				<template v-if="customized">
					<slot></slot>
				</template>

				<template v-else>
					<div v-if="header" class="i-dialog-header">
						<slot name="title"></slot>
						<a
							v-if="closeButton"
							class="i-dialog-close ml-auto"
							@click="handleHide"
						>
							<CloseRound style="height: 1.5em; width: 1.5em" />
						</a>
					</div>

					<div class="i-dialog-content">
						<slot></slot>
					</div>

					<div v-if="footer" class="i-dialog-footer">
						<slot name="footer"></slot>
						<i-button
							plain
							class="ml-auto mr-12"
							@click="handleCancel"
						>
							{{ cancel }}
						</i-button>
						<i-button @click="handleOk">{{ confirm }}</i-button>
					</div>
				</template>
			</div>
		</div>
	</Teleport>
</template>

<script setup lang="ts">
import { iButton } from "@p/index";
import { CloseRound } from "@vicons/material";
import { ref, watchEffect, withDefaults } from "vue";
import "./dialog.scss";
import type { Dialog } from "./types";

defineOptions({
	name: "i-dialog",
});

const props = withDefaults(defineProps<Dialog>(), {
	closable: true,
	backdropClosable: true,
	header: true,
	footer: true,
	closeButton: true,
	confirm: "确定",
	cancel: "取消",
});
const active = ref<boolean>(props.modelValue);
const bounced = ref<boolean>(false);
let togglable = true;

const emits = defineEmits<{
	(e: "update:modelValue", v: boolean): void;
	(e: "confirm"): void;
	(e: "cancel"): void;
	(e: "toggle", v: boolean): void;
}>();

watchEffect(() => {
	props.modelValue ? handleShow() : handleHide();
});

function handleBackDropClick() {
	props.backdropClosable && handleHide();
}

function handleCancel() {
	emits("cancel");
	handleHide();
}

function handleOk() {
	emits("confirm");
	handleHide();
}

function handleHide() {
	if (!props.closable || !togglable) {
		notAllowToClose();
		return;
	}

	togglable = false;
	active.value = false;
	emits("toggle", false);

	const timer = setTimeout(() => {
		togglable = true;
		emits("update:modelValue", false);
		timer && clearTimeout(timer);
	}, 120);
}

function handleShow() {
	if (!togglable) return;

	togglable = false;
	emits("toggle", true);
	const timer = setTimeout(() => {
		togglable = true;
		active.value = true;
		emits("update:modelValue", true);
		timer && clearTimeout(timer);
	}, 0);
}

function notAllowToClose() {
	bounced.value = true;
	setTimeout(() => {
		bounced.value = false;
	}, 400);
}
</script>
