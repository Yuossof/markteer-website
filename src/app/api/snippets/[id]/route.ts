/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCloudinary } from "@/lib/cloudinaryServer";
import { verifyAdminToken } from "@/lib/auth-admin";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const cloudinary = await getCloudinary()
    try {
        const token = req.cookies.get("authToken")?.value;
        const decoded = await verifyAdminToken(token);
        if (!decoded || !decoded.isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const existingUrl = formData.get("existingUrl") as string | null;
        const { id } = await params;

        let url = "";

        if (!file && !existingUrl) {
            // keep existing DB value
            const existing = await prisma.snippet.findUnique({ where: { id } });
            url = existing?.url || "";
        }

        if (file) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const uploadedUrl = await new Promise<string>((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "markteer/snippets" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result?.secure_url || "");
                    }
                );
                stream.end(buffer);
            });

            url = uploadedUrl;
        }

        if (existingUrl && !file) {
            url = existingUrl;
        }

        const snippet = await prisma.snippet.update({
            where: { id },
            data: { url },
        });

        return NextResponse.json({ message: "Snippet updated", snippet }, { status: 200 });
    } catch (error: any) {
        console.error("Update snippet error:", error);
        if (error.message?.includes("Unauthorized")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        if (error.code === "P2025") {
            return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
        }
        return NextResponse.json({ error: "Failed to update snippet" }, { status: 500 });
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

        const snippet = await prisma.snippet.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Snippet deleted", snippet }, { status: 200 });
    } catch (error: any) {
        console.error("Delete snippet error:", error);
        if (error.message?.includes("Unauthorized")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        if (error.code === "P2025") {
            return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
        }
        return NextResponse.json({ error: "Failed to delete snippet" }, { status: 500 });
    }
}
