import Message from './message.vue';
import useMessage from './useMessage';
import { componentInstall } from '@p/js/install';

const iMessage = componentInstall(Message);

export {
    useMessage
}
export default iMessage;