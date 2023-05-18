import { useState } from "@p/js/useState";
import { uuid } from "@p/js/utils";
import { h, reactive, ref, render } from "vue";
import Container from "./container.vue";
import "./message.scss";
import type { Message, MessageConfig } from "./types";

const heights: number[] = [];
const queue = ref<Message[]>([]);
const defaultConfig: MessageConfig = {
	duration: 3000,
	fromStart: true,
	align: "center",
	offset: "12px",
	max: 0,
};
const [align, setAlign] = useState<string>(defaultConfig.align);
const [offset, setOffset] = useState<string>(defaultConfig.offset);
const alignMap = {
	left: "flex-start",
	center: "center",
	right: "flex-end",
};

function useMessage(config?: MessageConfig) {
	if (config) {
		Object.assign(defaultConfig, config);
	}

	const { align, offset } = defaultConfig;
	align && setAlign(alignMap[align]);
	offset && setOffset(offset);

	return [post, close];
}

function post(item: string | Message) {
	item = mixinMessage(item);

	const { fromStart, duration } = item;
	const { max } = defaultConfig;
	const method = fromStart ? "unshift" : "push";

	queue.value[method](item);

	max && subtractQueue(max, fromStart);

	setTimeout(() => {
		const message = item as Message;
		const $el = document.getElementById(
			`i-message-${message.id}`
		) as HTMLElement;

		message.active = true;

		heights[method]($el.offsetHeight);
		reflow();
	}, 0);

	if (duration) {
		item.timer = setTimeout(() => {
			close.call(item as Message);
		}, duration);
	}
}

function close(this: Message) {
	const j = queue.value.findIndex((node: Message) => node.id === this.id);

	this.active = false;
	this.timer && clearTimeout(this.timer);

	setTimeout(() => {
		heights.splice(j, 1);
		queue.value.splice(j, 1);
		reflow();
	}, 240);
}

function mixinMessage(item: string | Message): Message {
	if (typeof item === "string") {
		item = { content: item };
	}

	return reactive(
		Object.assign({}, defaultConfig, item, {
			active: false,
			id: uuid(4),
			close,
		})
	);
}

function subtractQueue(max: number, fromStart?: boolean) {
	const l = heights.length;
	const method = fromStart ? "pop" : "shift";

	if (max <= l) {
		let i = 0;

		for (; i <= l - max; i++) {
			queue.value[method]();
			heights[method]();
		}
	}
}

function reflow(): void {
	let top = 0;
	const { bottom, gap = 8 } = defaultConfig;
	queue.value.map((node: Message, i: number) => {
		if (i > 0) {
			top += heights[i - 1];
		}
		node.offsetTop = `${bottom ? "bottom" : "top"}: ${top + i * gap}px`;
	});
}

render(
	h(Container, {
		items: queue.value,
		align,
		offset,
	}),
	document.body
);

export default useMessage;
