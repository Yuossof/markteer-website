import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/auth-admin";
import { getCloudinary } from "@/lib/cloudinaryServer";

export async function POST(request: NextRequest) {
  const cloudinary = await getCloudinary()
  try {
    const token = request.cookies.get("authToken")?.value;
    const decoded = await verifyAdminToken(token);
    if (!decoded || !decoded.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();

    const type = formData.get("type") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const link = formData.get("link") as string;
    const file = formData.get("file") as File;
    const existingImgUrl = formData.get("existingImgUrl") as string | null;

    let imgUrl = existingImgUrl || "";

    // Upload new image if provided
    if (file && file.size > 0) {
      try {
        const buffer = Buffer.from(await file.arrayBuffer());

        const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "markteer/spotlights",
              resource_type: "auto",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result as { secure_url: string });
            }
          );
          stream.end(buffer);
        });

        imgUrl = result.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        throw new Error(`Failed to upload image: ${uploadError instanceof Error ? uploadError.message : "Unknown error"}`);
      }
    }

    const spotlight = await prisma.spotlight.create({
      data: {
        type: type.trim(),
        title: title.trim(),
        description: description.trim(),
        link: link.trim(),
        imgUrl,
      },
    });

    return NextResponse.json({ message: "Spotlight created", spotlight }, { status: 201 });
  } catch (error) {
    console.error("Create spotlight error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

    const skip = (page - 1) * pageSize;

    const [spotlights, total] = await Promise.all([
      prisma.spotlight.findMany({
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" } as const,
      }),
      prisma.spotlight.count(),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return NextResponse.json(
      { spotlights, pagination: { page, pageSize, total, totalPages } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch spotlights error:", error);
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
