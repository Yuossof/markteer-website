import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/auth-admin";
import { getCloudinary } from "@/lib/cloudinaryServer";

type Params = { params: Promise<{ id: string }> };

export async function PUT(request: NextRequest, { params }: Params) {
  const cloudinary = await getCloudinary()

  try {
    const token = request.cookies.get("authToken")?.value;
    const decoded = await verifyAdminToken(token);
    if (!decoded || !decoded.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const formData = await request.formData();

    const type = (formData.get("type") as string) || undefined;
    const title = (formData.get("title") as string) || undefined;
    const description = (formData.get("description") as string) || undefined;
    const link = (formData.get("link") as string) || undefined;
    const file = formData.get("file") as File | null;
    const existingImgUrl = (formData.get("existingImgUrl") as string) || undefined;

    // Update data object
    const updateData: Record<string, string> = {};
    if (type) updateData.type = type.trim();
    if (title) updateData.title = title.trim();
    if (description) updateData.description = description.trim();
    if (link) updateData.link = link.trim();

    // Handle image upload
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

        updateData.imgUrl = result.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        throw new Error(`Failed to upload image: ${uploadError instanceof Error ? uploadError.message : "Unknown error"}`);
      }
    } else if (existingImgUrl) {
      updateData.imgUrl = existingImgUrl;
    }

    const updated = await prisma.spotlight.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ message: "Spotlight updated", spotlight: updated }, { status: 200 });
  } catch (error) {
    console.error("Update spotlight error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const token = request.cookies.get("authToken")?.value;
    const admin = await verifyAdminToken(token);
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { id } = await params;
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const deleted = await prisma.spotlight.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Spotlight deleted", spotlight: deleted }, { status: 200 });
  } catch (error) {
    console.error("Delete spotlight error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
