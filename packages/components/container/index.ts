import { withInstall } from "@p/js/install";
import container from "./container.vue";

const iContainer = withInstall(container);

export type { Container, ContainerLayout } from "./types";
export default iContainer;
