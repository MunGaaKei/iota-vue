import { withInstall } from "@p/js/install";
import select from "./select.vue";

const iSelect = withInstall(select);

export type { Select } from "./types";
export default iSelect;
