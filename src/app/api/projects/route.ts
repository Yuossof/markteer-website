import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/auth-admin";
import { getCloudinary as cloudinary } from "@/lib/cloudinaryServer";

export async function POST(request: NextRequest) {
  try {
    const cloudinaryInstance = await cloudinary();

    const token = request.cookies.get("authToken")?.value;
    const decoded = await verifyAdminToken(token);
    if (!decoded || !decoded.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }



    const formData = await request.formData();

    const name = (formData.get("name") as string) || undefined;
    const client = (formData.get("client") as string) || undefined;
    const description = formData.get("description") as string;
    const services = JSON.parse((formData.get("services") as string) || "[]");
    const shortDescriptions = JSON.parse((formData.get("shortDescriptions") as string) || "[]");
    const isUpcoming = (formData.get("isUpcoming") as string) === "true";
    const isFeature = (formData.get("isFeature") as string) === "true";
    const existingImages = formData.getAll("existingImages") as string[];
    const clientImageFile = formData.get("clientImage") as File | null;
    const files = formData.getAll("files") as File[];

    let clientImageUrl: string | undefined = undefined;

    if (clientImageFile) {
      try {
        const buffer = Buffer.from(await clientImageFile.arrayBuffer());

        const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
          const stream = cloudinaryInstance.uploader.upload_stream(
            {
              folder: "markteer/projects/clients",
              resource_type: "auto",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result as { secure_url: string });
            }
          );
          stream.end(buffer);
        });

        clientImageUrl = result.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary client image upload error:", uploadError);
        throw new Error(`Failed to upload client image to Cloudinary: ${uploadError instanceof Error ? uploadError.message : "Unknown error"}`);
      }
    }

    const project = await prisma.project.create({
      data: {
        name: name ? name.trim() : undefined,
        client: client ? client.trim() : undefined,
        clientImage: clientImageUrl,
        description: description.trim(),
        isUpcoming: isUpcoming,
        isFeature: isFeature,
        services: services && services.length
          ? { connect: services.map((id: string) => ({ id })) }
          : undefined,
      },
    });

    const imageUrls: string[] = [...existingImages];

    // Upload new files to Cloudinary
    for (const file of files) {
      try {
        const buffer = Buffer.from(await file.arrayBuffer());

        const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
          const stream = cloudinaryInstance.uploader.upload_stream(
            {
              folder: "markteer/projects",
              resource_type: "auto",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result as { secure_url: string });
            }
          );
          stream.end(buffer);
        });

        imageUrls.push(result.secure_url);
      } catch (uploadError) {
        console.error("Cloudinary upload error:", uploadError);
        throw new Error(`Failed to upload image to Cloudinary: ${uploadError instanceof Error ? uploadError.message : "Unknown error"}`);
      }
    }

    // Store image URLs in database
    if (imageUrls.length > 0) {
      await prisma.image.createMany({
        data: imageUrls.map((url) => ({
          url,
          projectId: project.id,
        })),
      });
    }

    // Store description sections
    if (shortDescriptions && shortDescriptions.length > 0) {
      await prisma.descriptionSection.createMany({
        data: shortDescriptions.map((item: { title: string; description: string }) => ({
          title: item.title,
          description: item.description,
          projectId: project.id,
        })),
      });
    }

    const created = await prisma.project.findUnique({
      where: { id: project.id },
      include: { images: true, services: true, descriptionSections: true },
    });

    return NextResponse.json({ message: "Project created", project: created }, { status: 201 });
  } catch (error) {
    console.error("Create project error:", error);
    
    // Handle Cloudinary config not found
    if (error instanceof Error && error.message.includes("Cloudinary config not found")) {
      return NextResponse.json(
        { error: "Cloudinary is not configured. Please set up Cloudinary settings in the admin panel." },
        { status: 503 }
      );
    }
    
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal Server Error" }, { status: 500 });
  }
}


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);

    const skip = (page - 1) * pageSize;

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        include: { images: true, services: true, descriptionSections: true },
        skip,
        take: pageSize,
        orderBy: { createdAt: "desc" } as const,
      }),
      prisma.project.count(),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return NextResponse.json(
      { projects, pagination: { page, pageSize, total, totalPages } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch projects error:", error);
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
