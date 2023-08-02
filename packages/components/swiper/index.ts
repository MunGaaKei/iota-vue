import { withInstall } from "@p/js/install";
import swiper from "./swiper.vue";

const iSwiper = withInstall(swiper);

export type { Swiper } from "./types";
export default iSwiper;
