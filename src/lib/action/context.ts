"use server";

import { type ActionContext } from "./types";
import { getSession } from "@/server/auth";
import { headers as nextHeaders } from "next/headers";

export async function createActionContext(): Promise<ActionContext> {
    const session = await getSession();
    const headers = nextHeaders();

    return {
        session,
        headers
    };
}