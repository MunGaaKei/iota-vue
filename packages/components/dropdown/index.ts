import { withInstall } from "@p/js/install";
import dropdown from "./dropdown.vue";

const iDropdown = withInstall(dropdown);

export type { Dropdown } from "./types";
export default iDropdown;
