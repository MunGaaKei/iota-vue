import { withInstall } from "@p/js/install";
import menu from "./menu.vue";

const iMenu = withInstall(menu);

export type { Menu, MenuItem } from "./types";
export default iMenu;
