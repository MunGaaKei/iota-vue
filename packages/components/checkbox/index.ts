import { withInstall } from "@p/js/install";
import checkboxItem from "./checkbox-item.vue";
import checkbox from "./checkbox.vue";
import type { Checkbox, CheckboxItem } from "./types";

const iCheckbox = withInstall(checkbox);
const iCheckboxItem = withInstall(checkboxItem);

export { iCheckboxItem };
export type { Checkbox, CheckboxItem };
export default iCheckbox;
