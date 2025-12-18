import { NextResponse } from "next/server";
import { getCloudinary } from "@/lib/cloudinaryServer";

type UploadBody = {
  image?: string; // data URL or remote URL
};

export async function POST(request: Request) {
      const cloudinary = await getCloudinary()
  
  try {
    const body = await request.json() as UploadBody;

    if (!body.image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    // If it's a data URL (base64), upload to Cloudinary
    // Otherwise, if it's a remote URL, send that back (or optionally fetch+upload)
    const image = body.image;

    let result;

    if (image.startsWith("data:") || image.startsWith("/")) {
      // Upload data URL or local path directly to Cloudinary
      result = await cloudinary.uploader.upload(image, { folder: "markteer" });
    } else if (image.startsWith("http")) {
      // Upload remote URL
      result = await cloudinary.uploader.upload(image, { folder: "markteer" });
    } else {
      // Unknown format
      return NextResponse.json({ error: "Unsupported image format" }, { status: 400 });
    }

    return NextResponse.json({ url: result.secure_url, raw: result }, { status: 200 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
