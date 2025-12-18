/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {getCloudinary} from "@/lib/cloudinaryServer";
import { verifyAdminToken } from "@/lib/auth-admin";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

            const job = await prisma.job.findUnique({
                where: { id },
                include: { team: true, office: true },
            });

        if (!job) {
            return NextResponse.json({ error: "Job not found" }, { status: 404 });
        }

        console.log(job)
        

        return NextResponse.json({ job }, { status: 200 });
    } catch (error: any) {
        console.error("Fetch job error:", error);
        return NextResponse.json({ error: "Failed to fetch job" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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
        const existingImgUrl = formData.get("existingImgUrl") as string | null;
        const { id } = await params;

        if (!title || !description || !teamId || !officeId) {
            return NextResponse.json(
                { error: "Title, description, teamId and officeId are required" },
                { status: 400 }
            );
        }

        let imgUrl = existingImgUrl || "";

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

        const job = await prisma.job.update({
            where: { id },
            data: {
                title,
                description,
                teamId,
                officeId,
                imgUrl,
            },
            include: { team: true, office: true },
        });

        return NextResponse.json({ message: "Job updated", job }, { status: 200 });
    } catch (error: any) {
        console.error("Update job error:", error);
        if (error.message?.includes("Unauthorized")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        if (error.code === "P2025") {
            return NextResponse.json({ error: "Job not found" }, { status: 404 });
        }
        return NextResponse.json({ error: "Failed to update job" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const token = req.cookies.get("authToken")?.value;

        await verifyAdminToken(token);
        const { id } = await params;

        const job = await prisma.job.delete({
            where: { id },
            include: { team: true, office: true },
        });

        return NextResponse.json({ message: "Job deleted", job }, { status: 200 });
    } catch (error: any) {
        console.error("Delete job error:", error);
        if (error.message?.includes("Unauthorized")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        if (error.code === "P2025") {
            return NextResponse.json({ error: "Job not found" }, { status: 404 });
        }
        return NextResponse.json({ error: "Failed to delete job" }, { status: 500 });
    }
}
