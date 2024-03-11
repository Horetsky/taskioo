
type SessionStorageValue<T> = {
    key: string;
    value: T;
}
export function useSessionStorage<T>() {

    const setItem = (key: string, value: T) => {
        const v = JSON.stringify(value);
        sessionStorage.setItem(key, v);
    };

    const getItem = (key: string): SessionStorageValue<T> | null => {
        const json = sessionStorage.getItem(key);
        if(json) {
            const value = JSON.parse(json) as T;
            return {
                key,
                value
            };
        }

        return null;
    };

    const removeItem = (key: string) => {
        sessionStorage.removeItem(key);
    };

    return {
        setItem,
        getItem,
        removeItem
    };
}