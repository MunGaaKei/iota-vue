export default `import {{name}} from './{{lowername}}.vue';
import { componentInstall } from '@p/js/install';

const i{{name}} = componentInstall({{name}});

export default i{{name}};

`;
