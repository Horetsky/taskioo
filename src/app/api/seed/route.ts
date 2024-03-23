import { type NextRequest, NextResponse } from "next/server";
import db from "@/server/db";
import { procedure } from "@/server/procedure";

export async function POST(req: NextRequest) {
    try {

        const q = db.user.select({});

        const r = await procedure(q).returns();

        return NextResponse.json({ message: "OK" }, { status: 200 });
    } catch (e) {
        return NextResponse.json({message: e}, {
            status: 500
        });
    }
}