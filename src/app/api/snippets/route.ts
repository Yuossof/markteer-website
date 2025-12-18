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
        const files = formData.getAll("files") as File[];

        if (!files || files.length === 0) {
            return NextResponse.json({ error: "At least one file is required" }, { status: 400 });
        }

        const uploadedUrls: string[] = [];

        for (const file of files) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const url = await new Promise<string>((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "markteer/snippets" },
                    (error, result) => {
                        if (error) reject(error);
                        else {
                            resolve(result?.secure_url || "");
                        }
                    }
                );
                stream.end(buffer);
            });

            uploadedUrls.push(url);
        }

        // create one Snippet row per uploaded url
        const data = uploadedUrls.map((u) => ({ url: u }));
        const result = await prisma.snippet.createMany({ data });

        return NextResponse.json({ message: "Snippets created", created: result.count, urls: uploadedUrls }, { status: 201 });
    } catch (error: any) {
        console.error("Create snippet error:", error);
        if (error.message?.includes("Unauthorized")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        return NextResponse.json({ error: "Failed to create snippet" }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url);
        const page = parseInt(url.searchParams.get("page") || "1");
        const pageSize = parseInt(url.searchParams.get("pageSize") || "10");
        const skip = (page - 1) * pageSize;
        const [snippets, total] = await Promise.all([
            prisma.snippet.findMany({
                skip,
                take: pageSize,
                orderBy: { createdAt: "desc" },
            }),
            prisma.snippet.count(),
        ]);

        const totalPages = Math.ceil(total / pageSize);
        return NextResponse.json(
            { snippets, pagination: { page, pageSize, total, totalPages } },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("Fetch snippets error:", error);
        return NextResponse.json({ error: "Failed to fetch snippets" }, { status: 500 });
    }
}
