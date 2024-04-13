import { type ZodSchema } from "zod";

export type NoId<T> = T extends { id: string } ? Omit<T, "id"> : T
type Order = "DESC" | "ASC";
export type Methods = "findMany" | "findUnique" | "create" | "delete";

export type Options<T> = {
    where?: Partial<T>;
    data?: NoId<T>;
    select?: {
        [K in keyof T]?: boolean;
    }
    returns?: {
        [K in keyof T]?: boolean
    } | "*";
    include?: {
        [key: string]: string;
    };
    order?: {
        [K in keyof T]: Order
    };
    limit?: number;
}

export namespace FindMany {
    export type Options<T> = {
        where?: Partial<T>;
        select?: {
            [K in keyof T]?: boolean;
        }
        include?: {
            [key: string]: string;
        };
        order?: {
            [K in keyof T]: Order
        };
        limit?: number;
    }

    export type Args<T, Output> = [
        options: Options<T>,
        returns?: ZodSchema<Output>
    ]
}

export namespace FindUnique {
    export type Options<T> = {
        where: Partial<T>;
        select?: {
            [K in keyof T]?: boolean;
        }
        include?: {
            [key: string]: string;
        };
        order?: {
            [K in keyof T]: Order
        };
        limit?: number;
    }
    export type Args<T, Output> = [
        options: Options<T>,
        returns?: ZodSchema<Output>
    ]
}

export namespace Create {
    export type Options<T> = {
        data: NoId<T>,
        returns?: {
            [K in keyof T]?: boolean
        } | "*";
    }
    export type Args<T, Output> = [
        options: Options<T>,
        returns?: ZodSchema<Output>
    ]
}

export namespace Delete {
    export type Options<T> = {
        where?: Partial<T>;
        returns?: {
            [K in keyof T]?: boolean
        } | "*";
    }
    export type Args<T, Output> = [
        options: Options<T>,
        returns?: ZodSchema<Output>
    ]
}

export namespace Update {
    export type Options<T> = {
        where?: Partial<T>;
        returns?: {
            [K in keyof T]?: boolean
        } | "*";
    }
    export type Args<T, Output> = [
        options: Options<T>,
        returns?: ZodSchema<Output>
    ]
}

export namespace QueryFunction {
    export type Type<T> = (...args: Args<T>) => string;
    export type Args<T> = [
        options: Options<T>, 
        table: string, 
        prevQuery: string
    ];

}