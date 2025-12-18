/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/auth-admin";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const token = req.cookies.get("authToken")?.value;
        const decoded = await verifyAdminToken(token);
        if (!decoded || !decoded.isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { title } = body;
        const { id } = await params;

        if (!title || typeof title !== "string") {
            return NextResponse.json({ error: "Title is required" }, { status: 400 });
        }

        const team = await prisma.team.update({
            where: { id },
            data: { title },
            include: { jobs: true },
        });

        return NextResponse.json({ message: "Team updated", team }, { status: 200 });
    } catch (error: any) {
        console.error("Update team error:", error);
        if (error.message?.includes("Unauthorized")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        if (error.code === "P2025") {
            return NextResponse.json({ error: "Team not found" }, { status: 404 });
        }
        return NextResponse.json({ error: "Failed to update team" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const token = req.cookies.get("authToken")?.value;
        const decoded = await verifyAdminToken(token);
        if (!decoded || !decoded.isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { id } = await params;

        const team = await prisma.team.delete({
            where: { id },
            include: { jobs: true },
        });

        return NextResponse.json({ message: "Team deleted", team }, { status: 200 });
    } catch (error: any) {
        console.error("Delete team error:", error);
        if (error.message?.includes("Unauthorized")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        if (error.code === "P2025") {
            return NextResponse.json({ error: "Team not found" }, { status: 404 });
        }
        return NextResponse.json({ error: "Failed to delete team" }, { status: 500 });
    }
}
