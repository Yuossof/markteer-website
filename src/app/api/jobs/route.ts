/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {getCloudinary} from "@/lib/cloudinaryServer";
import { verifyAdminToken } from "@/lib/auth-admin";

export async function POST(req: NextRequest) {
    const cloudinary = await getCloudinary()
    try {
        const token = req.cookies.get("authToken")?.value;
        const decoded = await verifyAdminToken(token);
        if (!decoded || !decoded.isAdmin) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }


        const formData = await req.formData();
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const teamId = formData.get("teamId") as string;
        const officeId = formData.get("officeId") as string;
        const file = formData.get("file") as File | null;

        if (!title || !description || !teamId || !officeId) {
            return NextResponse.json(
                { error: "Title, description, teamId and officeId are required" },
                { status: 400 }
            );
        }

        let imgUrl = "";

        if (file) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            await new Promise<string>((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "markteer/jobs" },
                    (error, result) => {
                        if (error) reject(error);
                        else {
                            imgUrl = result?.secure_url || "";
                            resolve(imgUrl);
                        }
                    }
                );
                stream.end(buffer);
            });
        }

        const job = await prisma.job.create({
            data: {
                title,
                description,
                imgUrl,
                teamId,
                officeId,
            },
            include: { team: true, office: true },
        });

        return NextResponse.json({ message: "Job created", job }, { status: 201 });
    } catch (error: any) {
        console.error("Create job error:", error);
        if (error.message?.includes("Unauthorized")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get("page") || "1");
        const pageSize = parseInt(url.searchParams.get("pageSize") || "10");
        const teamId = url.searchParams.get("teamId") || undefined;
        const officeId = url.searchParams.get("officeId") || undefined;
        const skip = (page - 1) * pageSize;

        const whereClause: any = {};
        if (teamId) whereClause.teamId = teamId;
        if (officeId) whereClause.officeId = officeId;
        const where = Object.keys(whereClause).length ? whereClause : undefined;

        const [jobs, total] = await Promise.all([
            prisma.job.findMany({
                where,
                skip,
                take: pageSize,
                include: { team: true, office: true },
                orderBy: { createdAt: "desc" },
            }),
            prisma.job.count({ where }),
        ]);

        const totalPages = Math.ceil(total / pageSize);
        return NextResponse.json(
            { jobs, pagination: { page, pageSize, total, totalPages } },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Fetch jobs error:", error);
        return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
    }
}
