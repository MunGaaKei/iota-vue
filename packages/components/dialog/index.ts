import { withInstall } from "@p/js/install";
import dialog from "./dialog.vue";

const iDialog = withInstall(dialog);

export type { Dialog } from "./types";
export default iDialog;
