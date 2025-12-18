import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/auth-admin";
import { serviceCreateSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get("authToken")?.value;
        const decoded = await verifyAdminToken(token);
        if (!decoded || !decoded.isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }


        const body = await request.json();

        const parse = serviceCreateSchema.safeParse(body);
        if (!parse.success) {
            return NextResponse.json(
                { error: parse.error.flatten() },
                { status: 400 }
            );
        }

        const { title, description, modules, shortDescription } = parse.data;

        // Create service with modules
        const service = await prisma.service.create({
            data: {
                title: title.trim(),
                description: description.trim(),
                shortDescription: shortDescription.trim(),
                modules: modules
                    ? {
                        create: modules.map(m => ({
                            title: m.title.trim(),
                            description: m.description.trim()
                        }))
                    }
                    : undefined,
            },
            include: {
                modules: true,
                projects: {
                    include: {
                        images: true
                    }
                }
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


export async function GET() {
    try {
        const services = await prisma.service.findMany({
            include: {
                modules: {
                    select: { title: true }
                },
                projects: {
                    take: 10, 
                    include: {
                        images: true,
                        services: true
                    }
                },
                _count: {
                    select: { projects: true } 
                }
            }
        });

        const servicesWithMeta = services.map(service => ({
            ...service,
            hasMoreProjects: service._count.projects > 10,
            totalProjects: service._count.projects,
            loadedProjects: service.projects.length
        }));

        return NextResponse.json(
            { services: servicesWithMeta },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error fetching services:", error);
        const message = error instanceof Error ? error.message : "Internal Server Error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}