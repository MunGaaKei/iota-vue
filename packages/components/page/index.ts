import { withInstall } from "@p/js/install";
import page from "./page.vue";

const iPage = withInstall(page);

export type { Page } from "./types";
export default iPage;
