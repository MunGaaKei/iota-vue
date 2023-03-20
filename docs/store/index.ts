import themeStore from "./theme";

const useStore = () => {
    return {
        theme: themeStore
    }
}

export interface PiniaStore {
    themeStore: ReturnType<typeof themeStore>
}

export {
    useStore
}