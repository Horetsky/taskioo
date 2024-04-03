"use client";

export function useSessionStorage<T>() {

    const setItem = (key: string, value: T) => {
        if(typeof window === "undefined") return;

        const v = JSON.stringify(value);
        sessionStorage.setItem(key, v);
    };

    const getItem = (key: string): T | null => {
        if(typeof window === "undefined") return null;

        const json = sessionStorage.getItem(key);
        if(json) {
            return  JSON.parse(json) as T;
        }
        return null;
    };

    const removeItem = (key: string) => {
        if(typeof window === "undefined") return;
        sessionStorage.removeItem(key);
    };

    return {
        setItem,
        getItem,
        removeItem
    };
}