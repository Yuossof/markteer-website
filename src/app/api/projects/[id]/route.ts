/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/auth-admin";
import { getCloudinary as cloudinary } from "@/lib/cloudinaryServer";

type Params = { params: Promise<{ id: string }> };
const cloudinaryInstance = await cloudinary()

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    console.log("projectId", id)
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const project = await prisma.project.findUnique({ where: { id }, include: { images: true, services: true, descriptionSections: true } });
    if (!project) return NextResponse.json({ error: "Project not found" }, { status: 404 });

    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.error("Get project error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  try {
    const token = request.cookies.get("authToken")?.value;
    const decoded = await verifyAdminToken(token);
    if (!decoded || !decoded.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }


    const { id } = await params;
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const formData = await request.formData();

    const name = (formData.get("name") as string) || undefined;
    const client = (formData.get("client") as string) || undefined;
    const description = (formData.get("description") as string) || undefined;
    const services = formData.get("services") ? JSON.parse(formData.get("services") as string) : undefined;
    const isUpcomingStr = formData.get("isUpcoming") ? (formData.get("isUpcoming") as string) : undefined;
    const isFeatureStr = formData.get("isFeature") ? (formData.get("isFeature") as string) : undefined;
    const shortDescriptions = formData.get("shortDescriptions") ? JSON.parse(formData.get("shortDescriptions") as string) : undefined;
    const existingImages = formData.getAll("existingImages") as string[];
    const clientImageFile = formData.get("clientImage") as File | null;
    const existingClientImage = (formData.get("existingClientImage") as string) || undefined;
    const files = formData.getAll("files") as File[];

    // Update project fields
    const updateData: any = {};
    if (name) updateData.name = name.trim();
    if (client) updateData.client = client.trim();
    if (description) updateData.description = description.trim();

    if (typeof isUpcomingStr !== "undefined") {
      updateData.isUpcoming = isUpcomingStr === "true";
    }

    if (typeof isFeatureStr !== "undefined") {
      updateData.isFeature = isFeatureStr === "true";
    }

    // Handle client image upload
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

        updateData.clientImage = result.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary client image upload error:", uploadError);
        throw new Error(`Failed to upload client image to Cloudinary: ${uploadError instanceof Error ? uploadError.message : "Unknown error"}`);
      }
    } else if (existingClientImage !== undefined) {
      updateData.clientImage = existingClientImage || null;
    }

    if (services && services.length) {
      updateData.services = {
        set: services.map((serviceId: string) => ({ id: serviceId }))
      };
    }

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

    // If images provided (new or existing), replace all images
    if (existingImages.length > 0 || files.length > 0) {
      await prisma.image.deleteMany({ where: { projectId: id } });
      if (imageUrls.length > 0) {
        await prisma.image.createMany({
          data: imageUrls.map((url) => ({
            url,
            projectId: id,
          })),
        });
      }
    }

    // Update description sections only if provided with content
    if (shortDescriptions && Array.isArray(shortDescriptions) && shortDescriptions.length > 0) {
      await prisma.descriptionSection.deleteMany({ where: { projectId: id } });
      await prisma.descriptionSection.createMany({
        data: shortDescriptions.map((item: { title: string; description: string }) => ({
          title: item.title,
          description: item.description,
          projectId: id,
        })),
      });
    }

    const updated = await prisma.project.update({
      where: { id },
      data: updateData,
      include: { images: true, services: true, descriptionSections: true }
    });

    return NextResponse.json({ message: "Project updated", project: updated }, { status: 200 });
  } catch (error) {
    console.error("Update project error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const token = request.cookies.get("authToken")?.value;
    const admin = await verifyAdminToken(token);
    if (!admin) return NextResponse.json({ error: "Unauthorized. Admin required" }, { status: 403 });

    const { id } = await params;
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    // Delete related data first
    await prisma.image.deleteMany({ where: { projectId: id } });
    await prisma.descriptionSection.deleteMany({ where: { projectId: id } });
    const deleted = await prisma.project.delete({ where: { id } });

    return NextResponse.json({ message: "Project deleted", project: deleted }, { status: 200 });
  } catch (error) {
    console.error("Delete project error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Internal Server Error" }, { status: 500 });
  }
}
