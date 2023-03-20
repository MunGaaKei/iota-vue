import List from './list.vue';
import ListItem from './list-item.vue'
import { componentInstall } from '@p/js/install';

const iList = componentInstall(List);
const iListItem = componentInstall(ListItem);

export { iListItem };
export default iList;