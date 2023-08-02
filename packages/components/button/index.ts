import { withInstall } from "@p/js/install";
import button from "./button.vue";

const iButton = withInstall(button);

export type { Button } from "./types";
export default iButton;
