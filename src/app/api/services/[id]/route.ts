/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/auth-admin";
import { serviceUpdateSchema } from "@/lib/validators";

type ServiceParams = {
    params?: any;
};

async function extractId(request: NextRequest, params?: any) {
    try {
        if (params) {
            if (typeof params.then === "function") {
                const p = await params;
                if (p?.id) return p.id;
            } else if (params.id) {
                return params.id;
            }
        }
    } catch (e) {
        // fallthrough to url parsing
    }

    try {
        const url = new URL(request.url);
        const parts = url.pathname.split("/").filter(Boolean);
        const id = parts.length > 0 ? parts[parts.length - 1] : undefined;
        return id;
    } catch (e) {
        return undefined;
    }
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: "Service ID is required" },
                { status: 400 }
            );
        }

        const service = await prisma.service.findUnique({
            where: { id },
            include: {
                projects: {
                    include: {
                        images: true,
                        services: true
                    }
                },
                modules: true
            }
        });

        if (!service) {
            return NextResponse.json(
                { error: "Service not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { service },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching service:", error);
        const message = error instanceof Error ? error.message : "Internal Server Error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}


// UPDATE service (admin only)
export async function PUT(request: NextRequest, { params }: ServiceParams) {
    try {
        const token = request.cookies.get("authToken")?.value;
        const decoded = await verifyAdminToken(token);
        if (!decoded || !decoded.isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }


        const id = await extractId(request, params);

        if (!id || typeof id !== "string" || id.trim() === "") {
            return NextResponse.json(
                { error: "Service ID is required" },
                { status: 400 }
            );
        }

        const body = await request.json();

        const parse = serviceUpdateSchema.safeParse(body);
        if (!parse.success) {
            return NextResponse.json(
                { error: parse.error.flatten() },
                { status: 400 }
            );
        }

        // Check if service exists
        const existingService = await prisma.service.findUnique({
            where: { id }
        });

        if (!existingService) {
            return NextResponse.json(
                { error: "Service not found" },
                { status: 404 }
            );
        }

        const { title, description, modules } = parse.data;

        // Prepare update data
        const updateData: Record<string, any> = {};

        if (title !== undefined && title.trim()) {
            updateData.title = title.trim();
        }

        if (description !== undefined && description.trim()) {
            updateData.description = description.trim();
        }

        // Handle modules: delete old ones and create new ones
        if (modules !== undefined) {
            // Delete existing modules
            await prisma.serviceModule.deleteMany({
                where: { serviceId: id }
            });

            // Create new modules if provided
            if (modules.length > 0) {
                updateData.modules = {
                    create: modules.map(m => ({
                        title: m.title.trim(),
                        description: m.description.trim()
                    }))
                };
            }
        }

        // Update service
        const updatedService = await prisma.service.update({
            where: { id },
            data: updateData,
            include: {
                projects: true,
                modules: true
            }
        });

        return NextResponse.json(
            {
                message: "Service updated successfully",
                service: updatedService
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error updating service:", error);

        const message =
            error instanceof Error
                ? error.message
                : "Internal Server Error";

        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}

// DELETE service (admin only)
export async function DELETE(request: NextRequest, { params }: ServiceParams) {
    try {
        const token = request.cookies.get("authToken")?.value;
        const decoded = await verifyAdminToken(token);
        if (!decoded || !decoded.isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const id = await extractId(request, params);

        if (!id || typeof id !== "string" || id.trim() === "") {
            return NextResponse.json(
                { error: "Service ID is required" },
                { status: 400 }
            );
        }

        // Check if service exists
        const existingService = await prisma.service.findUnique({
            where: { id }
        });

        if (!existingService) {
            return NextResponse.json(
                { error: "Service not found" },
                { status: 404 }
            );
        }

        // Delete service
        const deletedService = await prisma.service.delete({
            where: { id }
        });

        return NextResponse.json(
            {
                message: "Service deleted successfully",
                service: deletedService
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error deleting service:", error);

        let errorMessage = "Internal Server Error";

        if (error instanceof Error) {
            if (error.message.includes("Foreign key constraint failed")) {
                errorMessage = "Cannot delete service that has associated projects";
            } else {
                errorMessage = error.message;
            }
        }

        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
