/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/auth-admin";

type CreateServiceData = {
    title: string;
    description: string;
    shortDescription?: string;
    modules?: Array<{ title: string; description: string }>;
};

export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get("authToken")?.value;
        const decoded = await verifyAdminToken(token);
        if (!decoded || !decoded.isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await request.json() as CreateServiceData;

        // Validation
        if (!data.title || !data.title.trim()) {
            return NextResponse.json(
                { error: "Title is required" },
                { status: 400 }
            );
        }

        if (!data.description || !data.description.trim()) {
            return NextResponse.json(
                { error: "Description is required" },
                { status: 400 }
            );
        }

        // Create service with modules
        const createData: any = {
            title: data.title.trim(),
            shortDescription: data.shortDescription?.trim() ?? "",
            description: data.description.trim(),
            modules: data.modules && data.modules.length > 0 ? {
                create: data.modules.map((m: any) => ({
                    title: m.title.trim(),
                    description: m.description.trim()
                }))
            } : undefined
        };

        const service = await prisma.service.create({
            data: createData,
            include: {
                modules: true,
                projects: true
            }
        });

        return NextResponse.json(
            {
                message: "Service created successfully",
                service
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Error creating service:", error);

        const message =
            error instanceof Error
                ? error.message
                : typeof error === "string"
                    ? error
                    : "Internal Server Error";

        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}
