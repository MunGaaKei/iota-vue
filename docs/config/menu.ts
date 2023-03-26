import { h } from "vue";
import { DashboardTwotone, ApiRound, ColorLensTwotone } from "@vicons/material";

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
        title: "Popup",
        to: "/docs/popup",
      },
    ],
  },
  {
    title: "Directives",
    icon: () => h(ApiRound),
    children: [
      {
        title: "Ripple",
        to: "/docs/ripple",
      },
    ],
  },
];
