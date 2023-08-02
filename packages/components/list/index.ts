import { withInstall } from "@p/js/install";
import listItem from "./list-item.vue";
import list from "./list.vue";

const iListItem = withInstall(listItem);
const iList = withInstall(list);

export type { List, ListItem } from "./types";

export { iListItem };
export default iList;
