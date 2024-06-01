import { ZodError } from "zod";

export function errorHandler(error: unknown) {
    if(error instanceof ZodError) {
        throw new Error("Zod Error: Invalid fields!" + error.message);
    }

    let message: string;

    if(error instanceof Error) {
        message = error.message;
    } else if(error && typeof error === "object" && "message" in error) {
        message = String(error.message);
    } else if(typeof error === "string") {
        message = error;
    } else {
        message = "Something went wrong";
    }

    throw new Error(message);
}