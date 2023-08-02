import { withInstall } from "@p/js/install";
import radio from "./radio.vue";

const iRadio = withInstall(radio);

export type { Radio } from "./types";
export default iRadio;
