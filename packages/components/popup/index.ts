import { withInstall } from "@p/js/install";
import popup from "./popup.vue";

const iPopup = withInstall(popup);

export type { Popup } from "./types";
export default iPopup;
