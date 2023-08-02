import { withInstall } from "@p/js/install";
import table from "./table.vue";

const iTable = withInstall(table);

export type { Table } from "./types";
export default iTable;
