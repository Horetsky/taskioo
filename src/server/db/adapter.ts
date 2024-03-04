import {
    type DeleteOptions,
    type Methods,
    type MutateOptions,
    type SelectOptions,
    type SelectUniqueOptions
} from "@/server/types";
import { type ZodSchema } from "zod";
import { Query } from "@/server/utils/procedure";

export class Adapter<T> implements Methods<T>{

    protected query: Query<T>;

    constructor(table: string, input: ZodSchema<T>) {
        this.query = new Query<T>(table, input);
    }

    findUnique(options: SelectUniqueOptions<T>) {
        return this.query.select(options);
    }
    findMany(options: SelectOptions<T>) {
        return this.query.select(options);
    }
    create(options: MutateOptions<T>) {
        return this.query.insert(options);
    }
    update(options: MutateOptions<T>) {
        return this.query.update( options);
    }
    delete(options: DeleteOptions<T>) {
        return this.query.delete(options);
    }
}