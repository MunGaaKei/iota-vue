import settingsStore from "./settings";

const useStore = () => {
    return {
        global: settingsStore,
    };
};

export interface PiniaStore {
    settingsStore: ReturnType<typeof settingsStore>;
}

export { useStore };
