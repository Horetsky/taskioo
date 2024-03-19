/* eslint-disable @typescript-eslint/no-explicit-any */

import { type NextRequest } from "next/server";
import { del, put } from "@vercel/blob";

type Params = {
    params: {
        userId: string
    }
}

export async function POST(req: NextRequest, { params: {userId} }: Params) {
    try {
        const { searchParams } = new URL(req.url);
        const filename = searchParams.get("filename");

        if (!req.body) {
            throw new Error("Request body is not provided");
        }

        if (!filename) {
            throw new Error("Filename is not provided");
        }

        const _filePath = `${userId}/profile/picture/${filename}`;

        const blob = await put(_filePath, req.body, {
            access: "public"
        });

        return Response.json(blob);

    } catch (e: any) {
        return Response.json({ message: e.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const url = searchParams.get("url");

        if (!url) {
            throw new Error("File url is not provided");
        }

        await del(url);

        return Response.json({});

    } catch (e: any) {
        return Response.json({ message: e.message }, { status: 500 });
    }
}