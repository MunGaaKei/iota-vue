import { withInstall } from "@p/js/install";
import form from "./form.vue";

const iForm = withInstall(form);

export type { Form } from "./types";
export default iForm;
