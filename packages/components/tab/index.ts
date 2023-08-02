import { withInstall } from "@p/js/install";
import tabItem from "./tab-item.vue";
import tab from "./tab.vue";

const iTab = withInstall(tab);
const iTabItem = withInstall(tabItem);

export type { Tab, TabItem } from "./types";
export { iTabItem };
export default iTab;
