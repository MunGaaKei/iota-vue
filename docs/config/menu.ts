import {
	ApiRound,
	ColorLensTwotone,
	DashboardTwotone,
	TipsAndUpdatesTwotone,
} from "@vicons/material";
import { h } from "vue";

export default [
	{
		title: "USAGE",
		type: "subtitle",
	},
	{
		title: "Style & Colors",
		icon: () => h(ColorLensTwotone),
		children: [
			{
				title: "Colors",
				to: "/docs/colors",
			},
			{
				title: "Helper Class",
				to: "/docs/helper",
			},
		],
	},
	{
		title: "Components",
		icon: () => h(DashboardTwotone),
		expanded: true,
		children: [
			{
				title: "Button",
				to: "/docs/button",
			},
			{
				title: "Container",
				to: "/docs/container",
			},
			{
				title: "Dialog",
				to: "/docs/dialog",
			},
			{
				title: "Dropdown",
				to: "/docs/dropdown",
			},
			{
				title: "Form",
				to: "/docs/form",
				children: [
					{
						title: "Checkbox",
						to: "/docs/checkbox",
					},
					{
						title: "Input",
						to: "/docs/input",
					},
					{
						title: "Radio",
						to: "/docs/radio",
					},
					{
						title: "Select",
						to: "/docs/select",
					},
				],
			},
			{
				title: "Icon",
				to: "/docs/icon",
			},
			{
				title: "List",
				to: "/docs/list",
			},
			{
				title: "Message",
				to: "/docs/message",
			},
			{
				title: "Page",
				to: "/docs/page",
			},
			{
				title: "Popup",
				to: "/docs/popup",
			},
			{
				title: "Tab",
				to: "/docs/tab",
			},
			{
				title: "Table",
				to: "/docs/table",
			},
		],
	},
	{
		title: "Directives",
		icon: () => h(ApiRound),
		children: [
			{
				title: "Clickoutside",
				to: "/docs/clickoutside",
			},
			{
				title: "Ripple",
				to: "/docs/ripple",
			},
		],
	},
	{
		title: "Updates",
		icon: () => h(TipsAndUpdatesTwotone),
	},
];
