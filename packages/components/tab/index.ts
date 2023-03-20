import Tab from './tab.vue';
import TabItem from './tab-item.vue'
import { componentInstall } from '@p/js/install';

const iTabItem = componentInstall(TabItem);
const iTab = componentInstall(Tab);

export { iTabItem };
export default iTab;