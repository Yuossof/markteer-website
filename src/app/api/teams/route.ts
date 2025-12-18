/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/auth-admin";

export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get("authToken")?.value;
        const decoded = await verifyAdminToken(token);
        if (!decoded || !decoded.isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const body = await req.json();
        const { title } = body;

        if (!title || typeof title !== "string") {
            return NextResponse.json({ error: "Title is required" }, { status: 400 });
        }

        const team = await prisma.team.create({
            data: { title },
            include: { jobs: true },
        });

        return NextResponse.json({ message: "Team created", team }, { status: 201 });
    } catch (error: any) {
        console.error("Create team error:", error);
        if (error.message?.includes("Unauthorized")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.json({ error: "Failed to create team" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get("page") || "1");
        const pageSize = parseInt(url.searchParams.get("pageSize") || "10");
        const skip = (page - 1) * pageSize;

        const [teams, total] = await Promise.all([
            prisma.team.findMany({
                skip,
                take: pageSize,
                include: { jobs: { include: { office: true } } },
                orderBy: { createdAt: "desc" },
            }),
            prisma.team.count(),
        ]);

        const totalPages = Math.ceil(total / pageSize);
        return NextResponse.json(
            { teams, pagination: { page, pageSize, total, totalPages } },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Fetch teams error:", error);
        return NextResponse.json({ error: "Failed to fetch teams" }, { status: 500 });
    }
}
