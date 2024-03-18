type Order = "DESC" | "ASC";

export type Options<T> = Partial<{
    where: Partial<T>;
    data: NoId<T>;
    returns?: {
        [K in keyof T]?: boolean
    };
    select: {
        [K in keyof T]?: boolean;
    }
    include: {
        [key: string]: string;
    };
    order: {
        [K in keyof T]: Order
    };
    limit: number;
}>

export type SelectOptions<T> = Partial<{
    where: Partial<T>;
    select: {
        [K in keyof T]?: boolean;
    }
    include: {
        [key: string]: string;
    };
    order: {
        [K in keyof T]: Order
    };
    limit: number;
}>;


export type CreateOptions<T> = {
    data: NoId<T>;
    returns?: {
        [K in keyof T]?: boolean
    };
}


export type NoId<T> = T extends { id: string } ? Omit<T, "id"> : T

export type Methods<T> = {
    select: (options: SelectOptions<T>) => unknown;
    create: (options: CreateOptions<T>) => unknown;
    update: (options: Options<T>) => unknown;
    delete: (options: Options<T>) => unknown;
}