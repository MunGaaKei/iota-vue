import { withInstall } from "@p/js/install";
import input from "./input.vue";
import textarea from "./textarea.vue";

const iInput = withInstall(input);
const iTextarea = withInstall(textarea);

export type { Input, Textarea } from "./types";
export { iTextarea };
export default iInput;
