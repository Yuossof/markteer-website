/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/auth-admin";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("authToken")?.value;
        await verifyAdminToken(token);

        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get("page") || "1");
        const pageSize = parseInt(url.searchParams.get("pageSize") || "10");
        const skip = (page - 1) * pageSize;

        const [messages, total] = await Promise.all([
            prisma.message.findMany({
                skip,
                take: pageSize,
                orderBy: { createdAt: "desc" },
            }),
            prisma.message.count(),
        ]);

        const totalPages = Math.ceil(total / pageSize);
        return NextResponse.json(
            { messages, pagination: { page, pageSize, total, totalPages } },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Fetch messages error:", error);
        if (error.message?.includes("Unauthorized")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
    }
}
