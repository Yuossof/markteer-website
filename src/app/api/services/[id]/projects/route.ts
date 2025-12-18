import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        
        const { searchParams } = new URL(request.url);
        const skip = parseInt(searchParams.get('skip') || '0');
        const take = parseInt(searchParams.get('take') || '10');

        if (!id) {
            return NextResponse.json(
                { error: "Service ID is required" },
                { status: 400 }
            );
        }

        const projects = await prisma.project.findMany({
            where: {
                services: {
                    some: { id }
                }
            },
            skip,
            take,
            include: {
                images: true
            }
        });

        const totalCount = await prisma.project.count({
            where: {
                services: {
                    some: { id }
                }
            }
        });

        return NextResponse.json({
            projects,
            pagination: {
                skip,
                take,
                total: totalCount,
                hasMore: skip + take < totalCount
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching projects:", error);
        const message = error instanceof Error ? error.message : "Internal Server Error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}