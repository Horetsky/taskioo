/* eslint-disable @typescript-eslint/no-explicit-any */

import { type NextRequest, NextResponse } from "next/server";
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

        const _filePath = `profile/${userId}/picture/${filename}`;

        const blob = await put(_filePath, req.body, {
            access: "public"
        });

        return NextResponse.json(blob);

    } catch (e: any) {
        return NextResponse.json({ message: e.message });
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

        return NextResponse.json({ message: "OK" });

    } catch (e: any) {
        return NextResponse.json({ message: e.message });
    }
}