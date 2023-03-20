import { Ref, ref, readonly, DeepReadonly } from 'vue';

export function useState <T> (initialState?: T): [Ref<T>, (value: T) => void] {
    const value = ref(initialState) as Ref<T>;
    const setValue = (v: T) => (value.value = v)
    return [value, setValue]
}