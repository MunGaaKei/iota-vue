import { withInstall } from "@p/js/install";
import grid from "./grid.vue";

const iGrid = withInstall(grid);

export type { Grid } from "./types";
export default iGrid;
