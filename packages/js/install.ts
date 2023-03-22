import type { App, Plugin } from 'vue';

type FCWithInstall<T> = T & Plugin;

const componentInstall = <T>(component: T) => {
	const c = component as any;

	(c as FCWithInstall<T>).install = (app: App) => {
		app.component(c.name, c);
	};

	return c as FCWithInstall<T>;
};

export { componentInstall };
