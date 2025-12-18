/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/auth-admin";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("authToken")?.value;
        const decoded = await verifyAdminToken(token);
        if (!decoded || !decoded.isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }


        const config = await prisma.cloudinaryConfig.findFirst();
        if (!config) {
            return NextResponse.json({ error: "Cloudinary config not found" }, { status: 404 });
        }

        return NextResponse.json({ config }, { status: 200 });
    } catch (error) {
        console.error("Get cloudinary config error:", error);
        if ((error as any).message?.includes("Unauthorized")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const token = req.cookies.get("authToken")?.value;
        await verifyAdminToken(token);

        const body = await req.json();

        const { cloudName, apiKey, apiSecret } = body;

        if (!cloudName || !apiKey || !apiSecret) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        const existing = await prisma.cloudinaryConfig.findFirst();

        if (existing) {
            const updated = await prisma.cloudinaryConfig.update({
                where: { id: existing.id },
                data: {
                    cloudName,
                    apiKey,
                    apiSecret,
                },
            });

            return NextResponse.json({ message: "Config updated", config: updated });
        }

        const created = await prisma.cloudinaryConfig.create({
            data: {
                cloudName,
                apiKey,
                apiSecret,
            },
        });

        return NextResponse.json({ message: "Config created", config: created }, { status: 201 });

    } catch (error) {
        console.error("Cloudinary config error:", error);
        if ((error as any).message?.includes("Unauthorized")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
