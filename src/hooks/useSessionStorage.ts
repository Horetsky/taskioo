"use client";

export function useSessionStorage<T>() {

    const setItem = (key: string, value: T) => {
        const v = JSON.stringify(value);
        sessionStorage.setItem(key, v);
    };

    const getItem = (key: string): T | null => {
        const json = sessionStorage.getItem(key);
        if(json) {
            return  JSON.parse(json) as T;
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