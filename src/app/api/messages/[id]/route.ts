/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/auth-admin";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const token = req.cookies.get("authToken")?.value;
        const decoded = await verifyAdminToken(token);
        if (!decoded || !decoded.isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }


        const { id } = await params;

         await prisma.message.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Message deleted" }, { status: 200 });
    } catch (error: any) {
        console.error("Delete message error:", error);
        if (error.message?.includes("Unauthorized")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        if (error.code === "P2025") {
            return NextResponse.json({ error: "Message not found" }, { status: 404 });
        }
        return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
    }
}
