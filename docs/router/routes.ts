const pages = [
    {
        name: "home",
        path: "/",
        layout: "empty",
    },
    "button",
    "checkbox",
    "clickoutside",
    "colors",
    "container",
    "dialog",
    "dropdown",
    "form",
    "helper",
    "icon",
    "input",
    "list",
    "message",
    "popup",
    "radio",
    "ripple",
    "select",
    {
        name: "404",
        path: "/:pathMatch(.*)*",
        layout: "empty",
        title: "404",
    },
];

const routes = pages.map((p) => {
    if (typeof p === "string") {
        return {
            path: `/docs/${p}`,
            name: `page-${p}`,
            component: () => import(`@d/pages/${p}.vue`),
            meta: {
                title: p,
                layout: "docs",
            },
        };
    } else {
        const { name, path, layout, title } = p;

        return {
            path,
            name: `page-${name}`,
            component: () => import(`@d/pages/${name}.vue`),
            meta: {
                layout,
                title,
            },
        };
    }
});

export default routes;
