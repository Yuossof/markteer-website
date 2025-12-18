/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdminToken } from "@/lib/auth-admin";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("authToken")?.value;
    const decoded = await verifyAdminToken(token);
    if (!decoded || !decoded.isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }


    const body = await req.json();
    const { city } = body;

    if (!city || typeof city !== "string") {
      return NextResponse.json({ error: "City is required" }, { status: 400 });
    }

    const office = await prisma.office.create({
      data: { city },
    });

    return NextResponse.json({ message: "Office created", office }, { status: 201 });
  } catch (error: any) {
    console.error("Create office error:", error);
    if (error.message?.includes("Unauthorized")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to create office" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10");
    const skip = (page - 1) * pageSize;

    const [offices, total] = await Promise.all([
      prisma.office.findMany({
        skip,
        take: pageSize,
        include: { jobs: { include: { team: true } } },
        orderBy: { createdAt: "desc" },
      }),
      prisma.office.count(),
    ]);

    const totalPages = Math.ceil(total / pageSize);
    return NextResponse.json(
      { offices, pagination: { page, pageSize, total, totalPages } },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Fetch offices error:", error);
    return NextResponse.json({ error: "Failed to fetch offices" }, { status: 500 });
  }
}
