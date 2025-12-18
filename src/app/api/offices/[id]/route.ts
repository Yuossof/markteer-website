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
        const { city } = body;
        const { id } = await params;

        if (!city || typeof city !== "string") {
            return NextResponse.json({ error: "City is required" }, { status: 400 });
        }

        const office = await prisma.office.update({
            where: { id },
            data: { city },
        });

        return NextResponse.json({ message: "Office updated", office }, { status: 200 });
    } catch (error: any) {
        console.error("Update office error:", error);
        if (error.message?.includes("Unauthorized")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        if (error.code === "P2025") {
            return NextResponse.json({ error: "Office not found" }, { status: 404 });
        }
        return NextResponse.json({ error: "Failed to update office" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const token = req.cookies.get("authToken")?.value;

        await verifyAdminToken(token);
        const { id } = await params;

        const office = await prisma.office.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Office deleted", office }, { status: 200 });
    } catch (error: any) {
        console.error("Delete office error:", error);
        if (error.message?.includes("Unauthorized")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        if (error.code === "P2025") {
            return NextResponse.json({ error: "Office not found" }, { status: 404 });
        }
        return NextResponse.json({ error: "Failed to delete office" }, { status: 500 });
    }
}
