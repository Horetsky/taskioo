import {
    type Options,
    type CreateOptions,
    type Methods,
    type SelectOptions
} from "./types";
import { type ZodSchema } from "zod";
import { Query } from "./query";

export class Adapter<T> implements Methods<T>{

    protected query: Query<T>;

    constructor(table: string, input: ZodSchema<T>) {
        this.query = new Query<T>(table, input);
    }
    select(options: SelectOptions<T>) {
        return this.query.select(options);
    }
    create(options: CreateOptions<T>) {
        return this.query.insert(options);
    }
    update(options: Options<T>) {
        return this.query.update(options);
    }
    delete(options: Options<T>) {
        return this.query.delete(options);
    }
}